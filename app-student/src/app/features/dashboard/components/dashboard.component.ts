import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { StudentService } from '../../student/service/student.service';
import { AdvisorService } from '../../advisor/service/advisor.service';
import { SubjectService } from '../../subject/service/subject.service';
import { AuthService } from '../../auth/service/auth-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // 👈 ESTO FALTA
})
export class DashboardComponent implements OnInit {
  data: any[] = [];
  columns: string[] = [];

  username: string | null = null;
  role: string | null = null;

  loading = false;
  lastType = '';
  activeCard = '';

  // 🔥 MODAL
  showModal = false;
  isEdit = false;
  formData: any = {};

  constructor(
    private studentService: StudentService,
    private advisorService: AdvisorService,
    private subjectService: SubjectService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.username = this.auth.getUsername();
    this.role = this.auth.getRole();
    this.translate.use(localStorage.getItem('lang') || 'es');
  }

  load(type: string) {
    this.lastType = type;
    this.activeCard = type;
    this.loading = true;

    let request$: Observable<any[]>;

    switch (type) {
      case 'students':
        request$ = this.studentService.getStudents();
        break;
      case 'subjects':
        request$ = this.subjectService.getSubjects();
        break;
      case 'advisors':
        request$ = this.advisorService.getAdvisors();
        break;
      default:
        return;
    }

    request$.subscribe((res) => {
      this.data = res;
      this.columns = res.length
        ? Object.keys(res[0]).filter(col => {
          const c = col.toLowerCase();

          return (
            c !== 'id' &&
            !c.endsWith('id') &&
            !c.includes('ids')
          );
        })
        : [];      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  // 🔥 CREATE
  openCreate() {
    this.isEdit = false;
    this.formData = {};
    this.showModal = true;
  }

  // 🔥 EDIT
  openEdit(item: any) {
    this.isEdit = true;
    this.formData = { ...item };
    this.showModal = true;
  }

  save() {
    let request$: Observable<any> | undefined;

    const payload = { ...this.formData };

    // 🔥 SI ES CREATE → BORRAR ID
    if (!this.isEdit) {
      delete payload.id;
    }

    if (this.lastType === 'students') {
      request$ = this.isEdit
        ? this.studentService.update(payload.id, payload)
        : this.studentService.create(payload);
    }

    if (this.lastType === 'advisors') {
      request$ = this.isEdit
        ? this.advisorService.update(payload.id, payload)
        : this.advisorService.create(payload);
    }

    if (this.lastType === 'subjects') {
      request$ = this.isEdit
        ? this.subjectService.update(payload.id, payload)
        : this.subjectService.create(payload);
    }

    if (!request$) return;

    request$.subscribe(() => {
      this.showModal = false;
      this.load(this.lastType);
    });
  }

  delete(item: any) {
    if (!confirm('¿Eliminar?')) return;

    let request$;

    if (this.lastType === 'students') request$ = this.studentService.delete(item.id);
    if (this.lastType === 'advisors') request$ = this.advisorService.delete(item.id);
    if (this.lastType === 'subjects') request$ = this.subjectService.delete(item.id);

    request$?.subscribe(() => this.load(this.lastType));
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

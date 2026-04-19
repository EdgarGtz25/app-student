// subject.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from '../../../core/models/subject';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private url = 'http://localhost:8080/subjects';

  constructor(private http: HttpClient) {}

  getSubjects() {
    return this.http.get<Subject[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Subject>(`${this.url}/${id}`);
  }

  create(data: Subject) {
    return this.http.post<Subject>(this.url, data);
  }

  update(id: number, data: Subject) {
    return this.http.put<Subject>(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

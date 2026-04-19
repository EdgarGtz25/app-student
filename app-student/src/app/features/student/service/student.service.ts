// student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Student} from '../../../core/models/students';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private url = 'http://localhost:8080/students';

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<Student[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Student>(`${this.url}/${id}`);
  }

  create(data: Student) {
    return this.http.post<Student>(this.url, data);
  }

  update(id: number, data: Student) {
    return this.http.put<Student>(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

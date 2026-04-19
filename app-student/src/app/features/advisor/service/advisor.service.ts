// advisor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Advisor} from '../../../core/models/advisor';

@Injectable({ providedIn: 'root' })
export class AdvisorService {
  private url = 'http://localhost:8080/advisors';

  constructor(private http: HttpClient) {}

  getAdvisors() {
    return this.http.get<Advisor[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Advisor>(`${this.url}/${id}`);
  }

  create(data: Advisor) {
    return this.http.post<Advisor>(this.url, data);
  }

  update(id: number, data: Advisor) {
    return this.http.put<Advisor>(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:8080';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, {
      username,
      password
    }).pipe(
      tap(res => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', res.username);
          localStorage.setItem('role', res.role);
        }
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // ✅ correcto
  }

  getUsername(): string | null {
    return localStorage.getItem('user');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}

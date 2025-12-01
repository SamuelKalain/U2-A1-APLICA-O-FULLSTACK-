import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private apiUrl = 'https://ideal-eureka-x596jvq7pxp4f6gv6-3000.app.github.dev/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // LOGIN (RETORNA OBSERVABLE)
  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      );
  }

  // PEGAR TOKEN
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth/login']);
  }

  // VERIFICA SE ESTÁ AUTENTICADO
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}


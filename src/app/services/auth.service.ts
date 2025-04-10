import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  // Metodo para realizar el login
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Metodo para registrar un nuevo usuario
  register(newUser: { username: string; password: string; email: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, newUser);
  }
}

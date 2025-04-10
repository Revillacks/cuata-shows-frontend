import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.message === 'Login exitoso' && response.access_token) {
          // Guarda el token para uso en peticiones protegidas
          localStorage.setItem('access_token', response.access_token);
          console.log('Login exitoso');
          // Redirige según el rol devuelto
          if (response.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/client-dashboard']);
          }
        } else {
          alert('Credenciales inválidas');
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Ocurrió un error durante el proceso de autenticación');
      }
    });
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Respuesta del login:', response);
        if (response.message === 'Login exitoso' && response.access_token) {
          // Guarda el token para uso futuro
          localStorage.setItem('access_token', response.access_token);
          // Si la propiedad role no existe, usamos 'client' por defecto
          const role: string = response.role ? response.role : 'client';
          if (role === 'admin') {
            this.router.navigate(['/app/admin-dashboard']).then(() => {
              console.log('Redirigiendo a /app/admin-dashboard');
            });
          } else {
            this.router.navigate(['/app/client-dashboard']).then(() => {
              console.log('Redirigiendo a /app/client-dashboard');
            });
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

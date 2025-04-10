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
  // Objeto para almacenar las credenciales ingresadas
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Verifica que el mensaje del backend indique login exitoso y exista el token
        if (response.message === 'Login exitoso' && response.access_token) {
          // Guarda el token en localStorage para utilizarlo en peticiones protegidas
          localStorage.setItem('access_token', response.access_token);
          console.log('Login exitoso');
          // Redirige al dashboard
          this.router.navigate(['/dashboard']);
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

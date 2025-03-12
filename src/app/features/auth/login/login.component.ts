import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router){}

  login(): void {
    this.authService.login(this.credentials).subscribe(response => {
      if (response.message === 'Login exitoso'){
        this.router.navigate(['/dashboard']);
        console.log('Login exitoso');
      } else {
        alert('Credenciales invalidas');
      }
    });
  }
}


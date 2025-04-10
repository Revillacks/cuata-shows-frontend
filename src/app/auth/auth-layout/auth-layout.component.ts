import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  template: `
    <div class="auth-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./auth-layout.component.scss'],
  imports: [CommonModule, RouterOutlet]
})
export class AuthLayoutComponent {}

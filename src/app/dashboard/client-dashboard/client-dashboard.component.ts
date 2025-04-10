import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
  imports: [CommonModule, RouterLink, RouterOutlet],
})
export class ClientDashboardComponent {
  logout() {
    localStorage.removeItem('access_token');
    location.href = '/';
  }
}

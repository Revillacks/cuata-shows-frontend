import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminApiService } from '../admin-api.service';

interface Stat { label: string; value: number; }

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule, RouterLink, RouterOutlet],
})
export class AdminDashboardComponent implements OnInit {
  stats = signal<Stat[]>([]);

  constructor(private api: AdminApiService) {}

  ngOnInit(): void {
    this.api.stats().subscribe(({ services, events, users, contracts }) =>
      this.stats.set([
        { label: 'Servicios', value: services.length },
        { label: 'Eventos', value: events.length },
        { label: 'Usuarios', value: users.length },
        { label: 'Contrataciones', value: contracts.length },
      ]),
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    location.href = '/';
  }
}

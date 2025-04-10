import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface QuickStat {
  label: string;
  value: number;
}

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule, RouterOutlet],
})
export class AdminDashboardComponent implements OnInit {
  // 👉 señales (Angular 19) para reactividad sencilla
  quickStats = signal<QuickStat[]>([]);

  ngOnInit(): void {
    // Simulación de carga de datos (reemplaza por peticiones reales)
    this.quickStats.set([
      { label: 'Servicios', value: 12 },
      { label: 'Eventos', value: 8 },
      { label: 'Usuarios', value: 25 },
      { label: 'Contrataciones', value: 41 },
    ]);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    location.href = '/';          // o usa Router para navegar
  }
}

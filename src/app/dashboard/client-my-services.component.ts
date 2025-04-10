import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApiService, Contract, Service } from './admin-api.service';
import { jwtDecode } from 'jwt-decode';

interface Token { sub: number; username: string; role: string; }

@Component({
  standalone: true,
  selector: 'app-client-my-services',
  templateUrl: './client-my-services.component.html',
  styleUrls: ['./client-my-services.component.scss'],
  imports: [CommonModule],
})
export class ClientMyServicesComponent implements OnInit {
  contracts = signal<(Contract & { title?: string })[]>([]);

  constructor(private api: AdminApiService) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (!token) { return; }
    const { sub } = jwtDecode<Token>(token);

    // carga contrataciones + servicios para mostrar título
    this.api.listContracts().subscribe(contracts => {
      const my = contracts.filter(c => c.user_id === sub);
      this.api.listServices().subscribe(services => {
        const map = new Map<number, string>(services.map(s => [s.id!, s.title]));
        this.contracts.set(my.map(c => ({ ...c, title: map.get(c.service_id) })));
      });
    });
  }
}

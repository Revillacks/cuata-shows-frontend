import { Component, OnInit } from '@angular/core';
import { ServicesDataService, ServiceData } from '../services/services-data.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, MatCardModule], // Agrega los módulos necesarios
})
export class HomeComponent implements OnInit {
  // Variable para almacenar los servicios que obtenemos del backend
  services: ServiceData[] = [];

  constructor(private servicesData: ServicesDataService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener los datos cuando se inicializa el componente
    this.servicesData.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (err) => {
        console.error('Error al obtener los servicios:', err);
      }
    });
  }
}

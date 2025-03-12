import { Component, OnInit } from '@angular/core';
import { ServiceData, ServicesDataService } from '../../services/services-data.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-servicios',
  imports: [ CommonModule ,MatCardModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent implements OnInit {
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

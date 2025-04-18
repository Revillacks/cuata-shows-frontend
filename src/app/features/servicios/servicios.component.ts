import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ServiceData, ServicesDataService } from '../../services/services-data.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-servicios',
  imports: [ CommonModule, MatCardModule ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent implements OnInit, AfterViewInit {
  services: ServiceData[] = [];

  constructor(private servicesData: ServicesDataService, private el: ElementRef) {}

  ngOnInit(): void {
    this.servicesData.getServices().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error('Error al obtener los servicios:', err)
    });
  }

  ngAfterViewInit(): void {
    const items = this.el.nativeElement.querySelectorAll('.service-item');

    // Fallback si IntersectionObserver no existe
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      items.forEach((item: HTMLElement) => item.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).classList.add('visible');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    items.forEach((item: Element) => observer.observe(item));
  }
}

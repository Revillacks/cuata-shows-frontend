import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuatashows',
  imports: [ CommonModule ],
  templateUrl: './cuatashows.component.html',
  styleUrl: './cuatashows.component.scss'
})
export class CuatashowsComponent implements OnInit {

  count1 = 0;
  count2 = 0;
  count3 = 0;
  private alreadyAnimated = false;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.alreadyAnimated) {
              this.animateCounts();
              this.alreadyAnimated = true;
            }
          });
        },
        { threshold: 0.5 }
      );

      const target = this.el.nativeElement.querySelector('.stats-row');
      if (target) {
        observer.observe(target);
      }
    } else {
      // Si no está disponible (SSR o ambiente sin window), animar directamente
      this.animateCounts();
    }
  }

  animateCounts(): void {
    this.animateCountTo('count1', 10, 100);    // hasta 10, cada 50ms
    this.animateCountTo('count2', 15, 90);    // hasta 15
    this.animateCountTo('count3', 200, 60);    // hasta 200, más rápido
  }

  animateCountTo(field: 'count1' | 'count2' | 'count3', target: number, speed: number): void {
    let current = 0;
    const step = Math.ceil(target / 20);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        this[field] = target;
        clearInterval(interval);
      } else {
        this[field] = current;
      }
    }, speed);
  }
}

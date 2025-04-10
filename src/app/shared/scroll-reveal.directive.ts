import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements OnInit {
  constructor(private el: ElementRef, private rd: Renderer2) {}

  ngOnInit(): void {
    // Añade el estado inicial solo si existe IntersectionObserver
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.rd.addClass(this.el.nativeElement, 'pre-reveal');

      const obs = new IntersectionObserver(
        ([entry], observer) => {
          if (entry.isIntersecting) {
            this.rd.removeClass(this.el.nativeElement, 'pre-reveal');
            this.rd.addClass(this.el.nativeElement, 'reveal');
            observer.disconnect();
          }
        },
        { threshold: 0 }        // se dispara en cuanto toca el viewport
      );

      obs.observe(this.el.nativeElement);
    }
    // Si el navegador no soporta IO o estamos en SSR, no pasa nada:
    // la sección se ve inmediatamente (sin fade pero visible)
  }
}

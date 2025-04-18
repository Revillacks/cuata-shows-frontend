import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-casos-exito',
  standalone: true,
  templateUrl: './casos-exito.component.html',
  styleUrls: ['./casos-exito.component.scss'],
  imports: [CommonModule],
})
export class CasosExitoComponent {
  casos = [
    {
      titulo: 'Convención Caprepa – Cancún',
      imagen: 'assets/images/Caprepa.jpeg',
      descripcion: 'CS Pro Events tuvo el privilegio de llevar a cabo la Convención Caprepa en la ciudad de Cancún, coordinando cada etapa del evento de principio a fin. Brindamos un servicio integral que incluyó audio profesional, iluminación, pantalla LED, escenario, grabación, circuito cerrado y la presentación de grupos musicales en vivo. Este proyecto no solo destacó por su nivel técnico y logístico, sino también por demostrar nuestra capacidad operativa para desarrollar eventos de alto nivel en cualquier parte del territorio nacional. Transformamos cada evento en una experiencia única, con la calidad y compromiso que nos distingue.'
    },
    {
      titulo: 'Townhall P&G',
      imagen: 'assets/images/Townhall.jpeg',
      descripcion: 'Durante el Townhall P&G, lideramos la producción técnica integral del evento, brindando soluciones de audio, video, iluminación, grabación, circuito cerrado y transmisión en vivo. Cada elemento fue coordinado con precisión para garantizar una comunicación clara y una experiencia inmersiva, tanto presencial como digital. Ser parte de un evento de esta magnitud para una de las empresas más influyentes a nivel global reafirma nuestro compromiso con la excelencia y la confianza que grandes marcas depositan en nosotros.'
    },
    {
      titulo: 'Convención Crayola',
      imagen: 'assets/images/CCrayola.jpeg',
      descripcion: 'En la Convención Crayola, proporcionamos soluciones integrales de pantalla, iluminación y videomapping. Diseñamos una experiencia visual dinámica y creativa que potenció el impacto del evento, alineándonos con la esencia colorida e innovadora de la marca.'
    },
    {
      titulo: 'Amazon Conecta',
      imagen: 'assets/images/AConecta.jpeg',
      descripcion: 'Brindamos el servicio de circuito cerrado y grabación para el evento Amazon Conecta, asegurando una transmisión interna fluida y una cobertura audiovisual completa. Cada detalle fue capturado con precisión, garantizando un registro profesional y confiable del evento.'
    }
  ];

  casoActivo: any = null;

  abrirModal(caso: any): void {
    this.casoActivo = caso;
  }

  cerrarModal(): void {
    this.casoActivo = null;
  }
}

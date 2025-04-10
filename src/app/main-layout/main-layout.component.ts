import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from "../home/home.component";
import { CuatashowsComponent } from "../features/cuatashows/cuatashows.component";
import { CasosExitoComponent } from "../features/casos-exito/casos-exito.component";
import { ServiciosComponent } from "../features/servicios/servicios.component";
import { ClientesComponent } from "../features/clientes/clientes.component";
import { ContactoComponent } from "../features/contacto/contacto.component";
import { ScrollRevealDirective } from '../shared/scroll-reveal.directive';
import { WhatsappFloatComponent } from '../components/whatsapp-float/whatsapp-float.component';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CuatashowsComponent,
    CasosExitoComponent,
    ServiciosComponent,
    ClientesComponent,
    ContactoComponent,
    ScrollRevealDirective,
    WhatsappFloatComponent]
})
export class MainLayoutComponent {

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}

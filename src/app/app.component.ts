import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { CuatashowsComponent } from './features/cuatashows/cuatashows.component';
import { CasosExitoComponent } from './features/casos-exito/casos-exito.component';
import { ServiciosComponent } from './features/servicios/servicios.component';
import { ClientesComponent } from './features/clientes/clientes.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicesDataService } from './services/services-data.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    HomeComponent,
    CuatashowsComponent,
    CasosExitoComponent,
    ServiciosComponent,
    ClientesComponent,
    ContactoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cuata-shows-frontend';
}

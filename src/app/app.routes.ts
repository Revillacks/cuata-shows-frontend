import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { IslogGuard } from './core/guards/islog.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cuatashows',
    loadComponent: () =>
      import('./features/cuatashows/cuatashows.component').then((m) => m.CuatashowsComponent),
  },
  {
    path: 'casos-exito',
    loadComponent: () =>
      import('./features/casos-exito/casos-exito.component').then((m) => m.CasosExitoComponent),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./features/servicios/servicios.component').then((m) => m.ServiciosComponent),
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./features/clientes/clientes.component').then((m) => m.ClientesComponent),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/contacto/contacto.component').then((m) => m.ContactoComponent),
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'app',
    canActivate: [IslogGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

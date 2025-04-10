import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { IslogGuard } from './core/guards/islog.guard';

export const routes: Routes = [
  // Rutas de la página principal (one-slide-page)
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
  // Rutas para autenticación, usando el AuthLayoutComponent
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./auth/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
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
  // Rutas para el dashboard (por ejemplo, para usuarios logueados)
  {
    path: 'app',
    canActivate: [IslogGuard],
    children: [
      {
        path: 'admin-dashboard',
        loadComponent: () =>
          import('./dashboard/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'client-dashboard',
        loadComponent: () =>
          import('./dashboard/client-dashboard/client-dashboard.component').then((m) => m.ClientDashboardComponent),
      },
      {
        path: '',
        redirectTo: 'client-dashboard', // o 'admin-dashboard', según la lógica que desees implementar
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

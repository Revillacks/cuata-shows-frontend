import { Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';

export const clientRoutes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent,
    children: [
      { path: 'services', loadComponent: () => import('../client-my-services.component').then(m => m.ClientMyServicesComponent) },
      { path: 'profile',  loadComponent: () => import('../client-profile.component').then(m => m.ClientProfileComponent) },
      { path: '', redirectTo: 'services', pathMatch: 'full' },
    ],
  },
];

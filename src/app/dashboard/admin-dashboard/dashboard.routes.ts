import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'services',  loadComponent: () => import('../services-list.component').then(m => m.ServicesListComponent) },
      { path: 'events',    loadComponent: () => import('../events-list.component').then(m => m.EventsListComponent) },
      { path: 'users',     loadComponent: () => import('../users-list.component').then(m => m.UsersListComponent) },
      { path: 'contracts', loadComponent: () => import('../contracts-list.component').then(m => m.ContractsListComponent) },
      { path: '', redirectTo: 'services', pathMatch: 'full' },
    ],
  },
];

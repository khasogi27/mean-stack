import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

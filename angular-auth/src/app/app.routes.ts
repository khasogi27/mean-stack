import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LayoutComponent } from './routes/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./routes/dashboard/dashboard.component').then(c => c.DashboardComponent),
      },
      {
        path: 'data-base',
        loadComponent: () => import('./routes/data-base/data-base.component').then(c => c.DataBaseComponent),
      },
      {
        path: 'job-schedule',
        loadComponent: () => import('./routes/job-schedule/job-schedule.component').then(c => c.JobScheduleComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard:quu:'
  }
];

import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LayoutComponent } from './layout/layout.component';

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
        path: 'user',
        loadComponent: () => import('./routes/user/user.component').then(c => c.UserComponent),
      },
      {
        path: 'data-base',
        loadComponent: () => import('./routes/data-base/data-base.component').then(c => c.DataBaseComponent),
      },
      {
        path: 'job-schedule',
        loadComponent: () => import('./routes/job-schedule/job-schedule.component').then(c => c.JobScheduleComponent)
      },
      {
        path: 'subscription',
        loadComponent: () => import('./routes/subsc/subsc.component').then(c => c.SubscComponent)
      },
      {
        path: 'local-loop',
        loadComponent: () => import('./routes/local-loop/local-loop.component').then(c => c.LocalLoopComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./routes/register/register.component').then(c => c.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

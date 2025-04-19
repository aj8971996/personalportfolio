import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'resume',
    loadComponent: () => import('./features/resume/resume.component').then(m => m.ResumeComponent),
    title: 'Resume'
  },
  {
    path: 'services',
    loadComponent: () => import('./features/my-services/my-services.component').then(m =>m.MyServicesComponent),
    title: 'My Services'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
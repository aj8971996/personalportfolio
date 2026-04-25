import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Alex Barkus — Forward Deployed Engineer'
  },
  {
    path: 'approach',
    loadComponent: () => import('./features/approach/approach.component').then(m => m.ApproachComponent),
    title: 'Approach — Alex Barkus'
  },
  {
    path: 'resume',
    loadComponent: () => import('./features/resume/resume.component').then(m => m.ResumeComponent),
    title: 'Resume — Alex Barkus'
  },
  {
    path: 'services',
    redirectTo: 'approach',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

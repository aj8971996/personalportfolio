import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects-list/projects-list.component').then(m => m.ProjectsListComponent),
    title: 'Projects'
  },
  {
    path: 'resume',
    loadComponent: () => import('./features/resume/resume.component').then(m => m.ResumeComponent),
    title: 'Resume'
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent),
    title: 'Skills'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
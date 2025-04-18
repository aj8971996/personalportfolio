import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
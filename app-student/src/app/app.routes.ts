import { Routes } from '@angular/router';
import { STUDENT_ROUTES } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: '',
    children: STUDENT_ROUTES
  }
];

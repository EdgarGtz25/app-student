import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import {LoginComponent} from '../auth/component/login.component';

export const STUDENT_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

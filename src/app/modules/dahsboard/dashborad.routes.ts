import { Routes } from '@angular/router';
import { PetitionsPageComponent } from './pages/petitions-dashboard-page/petitions-page.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: PetitionsPageComponent,
  },
];

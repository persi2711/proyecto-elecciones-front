import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MainLayoutComponent } from '../../shared/layouts/main-layout/main-layout.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
    ],
  },
];

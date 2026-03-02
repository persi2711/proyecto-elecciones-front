import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { UserProfilePageComponent } from './pages/user-profile-main-page/user-profile-page.component';
import { ClientOnlyComponent } from '../../shared/layouts/client-only/client-only.component';
import { MainLayoutComponent } from '../../shared/layouts/main-layout/main-layout.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: StartPageComponent,
      },
    ],
  },
];

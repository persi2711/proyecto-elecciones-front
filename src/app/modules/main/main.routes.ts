import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { UserProfilePageComponent } from './pages/user-profile-main-page/user-profile-page.component';
import { ClientOnlyComponent } from '../../shared/layouts/client-only/client-only.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'me',
    component: ClientOnlyComponent,
    children: [
      {
        path: '',
        component: UserProfilePageComponent,
      },
    ],
  },
];

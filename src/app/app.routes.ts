import { Routes } from '@angular/router';
import { sessionInitializerGuard } from './shared/guards/sesion-initializer.guard';
import { adminGuard, authGuard, guestGuard } from './shared/guards/app-auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [sessionInitializerGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/main/main.routes').then((m) => m.MainRoutes),
      },
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.routes').then((m) => m.AuthRoutes),
        canActivate: [guestGuard],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dahsboard/dashborad.routes').then((m) => m.DashboardRoutes),
        canActivate: [adminGuard],
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.routes').then((m) => m.MainRoutes),
        canActivate: [authGuard],
      },
    ],
  },
];

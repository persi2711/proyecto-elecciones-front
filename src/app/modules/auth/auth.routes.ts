import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-auth-page/login-page.component';
import { ClientOnlyComponent } from '../../shared/layouts/client-only/client-only.component';
import path from 'path';
import { AuthLayoutComponent } from './layouts/auth-layouth/auth-layout.component';
import { BasicRegisterFormComponent } from './components/forms/basic-regiser-form/basic-register-form.component';
import { RegisterPageComponent } from './pages/register-auth-page/register-page.component';
import { FullRegisterPageComponent } from './pages/full-register-page/full-register-page.component';

import { AuthContextLayoutComponent } from './layouts/auth-context-layout/auth-context-layout.component';
import { AuthContextService } from './services/auth-context-layout.service';
import { FullRegisterLayoutComponent } from './layouts/full-register-layout/full-register-layout.component';
import { SendConfirmPageComponent } from './pages/send-confirm-page/send-confirm-page.component';
import { tokenAuthGuard } from './guards/register-auth.guard';
import { ActiveAccountPageComponent } from './pages/activate-account-page/active-account-page.component';
import { ActiveAcountGuard } from './guards/active-account.guard';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthContextLayoutComponent,
    providers: [AuthContextService],
    children: [
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: '',
            component: LoginPageComponent,
          },
          {
            path: 'register',
            component: RegisterPageComponent,
          },
        ],
      },
      {
        path: 'full',
        component: FullRegisterLayoutComponent,
        children: [
          {
            path: 'register/:token',
            component: FullRegisterPageComponent,
            canActivate: [tokenAuthGuard],
          },
          {
            path: 'confirm/:token',
            component: SendConfirmPageComponent,
            canActivate: [tokenAuthGuard],
          },
          {
            path: 'verify/:token',
            component: ActiveAccountPageComponent,
            canActivate: [ActiveAcountGuard],
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

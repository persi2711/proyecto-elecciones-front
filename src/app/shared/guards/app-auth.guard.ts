import { inject } from '@angular/core';
import { AuthService } from '../services/app-auth.service';

import { map } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el Signal tiene usuario, bloqueamos acceso a login/register
  if (authService.currentUser()) {
    return router.createUrlTree(['/']);
  }

  // Si no hay usuario pero hay cookie, esperamos a que checkAuth termine (opcional)
  return true;
};
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  if (user && user.isAdmin) {
    return true;
  }

  // Si está logueado pero no es admin, lo mandamos a su perfil
  if (user) {
    return router.createUrlTree(['/']);
  }

  // Si ni siquiera hay sesión, al login
  return router.createUrlTree(['/auth/login']);
};

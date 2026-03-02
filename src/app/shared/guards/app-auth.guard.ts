import { inject } from '@angular/core';
import { AuthService } from '../services/app-auth.service';

import { map } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()) {
    return router.createUrlTree(['/']);
  }

  return true;
};
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  if (user && user.isAdmin) {
    return true;
  }

  if (user) {
    return router.createUrlTree(['/']);
  }

  return router.createUrlTree(['/auth/login']);
};

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};

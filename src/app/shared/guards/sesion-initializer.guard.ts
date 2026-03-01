import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/app-auth.service';

export const sessionInitializerGuard: CanActivateFn = () => {
  return inject(AuthService).checkAuth(); // Solo intenta cargar, no bloquea
};

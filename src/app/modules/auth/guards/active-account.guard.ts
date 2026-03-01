import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SimpleAuthEndpoint } from '../../../api/endpoints/auth/simple-auth-endpoint.service';
import { LayoutService } from '../../../shared/services/layout.service';
import { catchError, map, of, take } from 'rxjs';

export const ActiveAcountGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(SimpleAuthEndpoint);
  const layoutService = inject(LayoutService);

  const token = route.paramMap.get('token');

  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  // Llamamos al backend para activar
  return authService.verifyAccount(token).pipe(
    take(1),
    map(() => true), // Activación exitosa, permite el acceso al componente
    catchError((err) => {
      const msg = err.error?.message || 'El enlace de activación es inválido o ha expirado.';
      layoutService.error(msg);
      router.navigateByUrl('/auth/login');
      return of(false);
    }),
  );
};

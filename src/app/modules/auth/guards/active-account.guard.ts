import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SimpleAuthEndpoint } from '../../../api/endpoints/auth/simple-auth-endpoint.service';
import { LayoutService } from '../../../shared/services/layout.service';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../../../shared/services/app-auth.service';
export const ActiveAcountGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authApiService = inject(SimpleAuthEndpoint);
  const authSessionService = inject(AuthService);
  const layoutService = inject(LayoutService);

  const token = route.paramMap.get('token');

  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return authApiService.verifyAccount(token).pipe(
    take(1),

    switchMap((res: any) => {
      return authSessionService.setSession(res.token).pipe(
        map((success) => {
          if (success) {
            return true;
          }
          throw new Error('No se pudo iniciar la sesión tras activar');
        }),
      );
    }),
    catchError((err) => {
      const msg = err.error?.message || 'El enlace de activación es inválido o ha expirado.';
      layoutService.error(msg);
      router.navigateByUrl('/auth/login');
      return of(false);
    }),
  );
};

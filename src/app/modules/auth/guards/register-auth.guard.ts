import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { SimpleAuthEndpoint } from '../../../api/endpoints/auth/simple-auth-endpoint.service';
import { AuthContextService } from '../services/auth-context-layout.service';
export const tokenAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(SimpleAuthEndpoint);
  const authContextService = inject(AuthContextService);

  const token = route.paramMap.get('token');
  const shouldBeRegistered = route.data['shouldBeRegistered'] as boolean;

  if (!token) return router.parseUrl('/auth');

  return authService.validateToken(token).pipe(
    take(1),
    map((response) => {
      authContextService.email.set(response.email);
      authContextService.provider.set(response.provider);

      // ✅ CONDICIÓN DE SALIDA: Si el estado del usuario coincide con
      // lo que esta ruta específica requiere, NO redirigir.
      if (response.registed === shouldBeRegistered) {
        return true;
      }

      // 🔄 REDIRECCIÓN: Solo si el estado es el opuesto al que requiere la ruta
      const targetPath = response.registed
        ? `/auth/full/confirm/${token}`
        : `/auth/full/register/${token}`;

      // ⚠️ IMPORTANTE: Si por algún error de lógica la ruta actual
      // es igual a targetPath, devolvemos true para romper el ciclo.
      if (state.url.includes(targetPath)) {
        return true;
      }

      return router.parseUrl(targetPath);
    }),
    catchError(() => of(router.parseUrl('/auth'))),
  );
};

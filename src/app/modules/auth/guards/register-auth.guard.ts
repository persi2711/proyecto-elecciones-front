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

      if (response.registed === shouldBeRegistered) {
        return true;
      }

      const targetPath = response.registed
        ? `/auth/full/confirm/${token}`
        : `/auth/full/register/${token}`;

      if (state.url.includes(targetPath)) {
        return true;
      }

      return router.parseUrl(targetPath);
    }),
    catchError(() => of(router.parseUrl('/auth'))),
  );
};

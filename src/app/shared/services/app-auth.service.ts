import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { SimpleAuthEndpoint } from '../../api/endpoints/auth/simple-auth-endpoint.service';
import { UserSession } from '../../api/objects/dto/user-sesion-dto';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private simpleAuthEndpoint = inject(SimpleAuthEndpoint);
  private cookie = inject(CookieService);
  private router = inject(Router);

  #currentUser = signal<UserSession | null>(null);
  currentUser = this.#currentUser.asReadonly();
  #isLoaded = false;

  checkAuth(): Observable<boolean> {
    const token = this.cookie.get('session_token');

    if (!token || this.#isLoaded) return of(true);
    return this.simpleAuthEndpoint.validateSesion().pipe(
      tap((user) => {
        this.#currentUser.set(user);
        this.#isLoaded = true;
      }),
      map(() => true),
      catchError(() => {
        this.logout();
        this.#isLoaded = true;
        return of(true);
      }),
    );
  }

  setSession(token: string) {
    this.cookie.set('session_token', token, { path: '/', secure: true, sameSite: 'Lax' });
  }
  logout() {
    this.cookie.delete('session_token', '/');
    this.#currentUser.set(null);
    this.#isLoaded = false;
    this.router.navigate(['/']);
  }
}

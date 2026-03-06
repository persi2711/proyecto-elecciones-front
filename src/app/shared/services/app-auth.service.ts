import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { SimpleAuthEndpoint } from '../../api/endpoints/auth/simple-auth-endpoint.service';
import { UserSession } from '../../api/objects/dto/user-sesion-dto';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private simpleAuthEndpoint = inject(SimpleAuthEndpoint);
  private cookie = inject(CookieService);
  private router = inject(Router);
  isChecking = signal(true);
  #currentUser = signal<UserSession | null>(null);
  currentUser = this.#currentUser.asReadonly();
  #isLoaded = false;

  setSession(token: string): Observable<boolean> {
    this.cookie.set('session_token', token, { path: '/', secure: true, sameSite: 'Lax' });

    return this.simpleAuthEndpoint.validateSesion().pipe(
      tap((res: any) => {
        const expirationDate = new Date(res.expiresAt);

        this.cookie.set('session_token', token, {
          path: '/',
          secure: true,
          sameSite: 'Lax',
          expires: expirationDate,
        });

        this.#currentUser.set(res.user);
        this.isChecking.set(false);
        this.#isLoaded = true;
        this.router.navigateByUrl('/home');
      }),
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      }),
    );
  }

  checkAuth(): Observable<boolean> {
    const token = this.cookie.get('session_token');

    if (!token) {
      this.isChecking.set(false);
      return of(true);
    }

    if (this.#isLoaded) {
      this.isChecking.set(false);
      return of(true);
    }

    return this.simpleAuthEndpoint.validateSesion().pipe(
      tap((res: any) => {
        this.#currentUser.set(res.user);
        this.#isLoaded = true;
      }),
      map(() => true),
      catchError(() => {
        this.logout();
        this.#isLoaded = true;
        return of(true);
      }),

      finalize(() => {
        this.isChecking.set(false);
      }),
    );
  }
  logout() {
    this.cookie.delete('session_token', '/');
    this.#currentUser.set(null);
    this.#isLoaded = false;
    this.router.navigate(['/']);
  }
}

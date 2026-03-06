import { inject, Injectable, NgZone } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../shared/tokens/app-config-token.token';
import { HttpClient } from '@angular/common/http';
import { GoogleRegister } from '../../objects/dto/simple-register.dto';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/app-auth.service';

@Injectable({ providedIn: 'root' })
export class GoogleButtonService {
  private http = inject(HttpClient);
  private config = inject<AppConfig>(APP_CONFIG);
  private url = this.config.apiBaseUrl + 'auth/';
  private router = inject(Router);
  private zone = inject(NgZone);
  private authService = inject(AuthService);

  constructor() {
    this.setupGoogleConfig();
  }

  private setupGoogleConfig() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: this.config.googleAuthOToken,
      callback: (response: any) => {
        this.zone.run(() => {
          this.handleLogin(response.credential);
        });
      },
      use_fedcm_for_prompt: true,
    });
  }

  renderGoogleButton(element: HTMLElement) {
    // @ts-ignore
    google.accounts.id.renderButton(element, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'pill',
      width: '350',
    });
  }
  private handleLogin(idToken: string) {
    this.http
      .post<{ token: string; type: 'Create' | 'Session' }>(this.url + 'google', { token: idToken })
      .subscribe({
        next: (res) => {
          if (res.type === 'Create') {
            this.router.navigateByUrl('/auth/full/register/' + res.token);
          } else {
            this.authService.setSession(res.token);
          }
        },
        error: (err) => {
          console.error('❌ Error en el login:', err);
        },
      });
  }
  createGoogleAccount(googleRegister: GoogleRegister): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.url + 'register-google', googleRegister);
  }
}

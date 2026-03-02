import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../shared/tokens/app-config-token.token';
import { SimpleLoginDto } from '../../objects/dto/simple-login-dto';
import { Observable } from 'rxjs';
import { SimpleRegister } from '../../objects/dto/simple-register.dto';
import { UserSession } from '../../objects/dto/user-sesion-dto';

@Injectable({ providedIn: 'root' })
export class SimpleAuthEndpoint {
  private http = inject(HttpClient);
  private config = inject<AppConfig>(APP_CONFIG);
  private url = this.config.apiBaseUrl + 'simple-auth/';
  constructor() {}
  iniciarSesion(loginDto: SimpleLoginDto): Observable<{ token: string; verified: boolean }> {
    return this.http.post<{ token: string; verified: boolean }>(this.url + 'login', loginDto);
  }
  validateEmail(email: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.url + 'validate-email', { email: email });
  }
  validateToken(
    token: string,
  ): Observable<{ email: string; registed: boolean; provider: 'google' | 'application' }> {
    return this.http.post<{ email: string; registed: boolean; provider: 'google' | 'application' }>(
      this.url + 'validate-token',
      {
        token: token,
      },
    );
  }
  simpleRegister(dto: SimpleRegister): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.url + 'register', dto);
  }
  verifyAccount(token: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.url + 'verify', { token: token });
  }
  sendEmail(token: string): Observable<{
    emailSend: boolean;
    cooldown: Date | null;
  }> {
    return this.http.post<{
      emailSend: boolean;
      cooldown: Date | null;
    }>(this.url + 'send-email', { token: token });
  }

  validateSesion(): Observable<{ user: UserSession; expiresAt: string }> {
    return this.http.get<{ user: UserSession; expiresAt: string }>(this.url + 'validate-sesion');
  }
}

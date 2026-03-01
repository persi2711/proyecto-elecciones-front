// app-config.token.ts
import { InjectionToken } from '@angular/core';
export interface AppConfig {
  apiBaseUrl: string;
  googleAuthOToken: string;
}

export const APP_CONFIG = new InjectionToken<any>('APP_CONFIG');

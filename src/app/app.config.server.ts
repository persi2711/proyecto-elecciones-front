import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { APP_CONFIG } from './shared/tokens/app-config-token.token';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: APP_CONFIG,
      useValue: {
        apiBaseUrl: process.env['API_BASE_URL'] || 'http://localhost:3000/api/',
        googleAuthOToken:
          process.env['GOOGLE_AUTH_TOKEN'] ||
          '169929030492-2e8f30dqlrsrr49ttrf34bv5530na4n7.apps.googleusercontent.com',
      },
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

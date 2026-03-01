import { Injectable, signal } from '@angular/core';

@Injectable()
export class AuthContextService {
  email = signal<string | null>('null');
  provider = signal<'google' | 'application' | null>(null);
  constructor() {}
}

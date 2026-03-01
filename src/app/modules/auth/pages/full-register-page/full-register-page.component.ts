import { Component, computed, inject, input, OnInit, Signal, signal } from '@angular/core';
import { SimpleAuthEndpoint } from '../../../../api/endpoints/auth/simple-auth-endpoint.service';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../shared/services/layout.service';
import { AuthContextService } from '../../services/auth-context-layout.service';
import { FullRegisterFormComponent } from '../../components/forms/full-register-form/full-register-form.component';

@Component({
  standalone: true,
  imports: [FullRegisterFormComponent],
  selector: 'app-full-register-page',
  templateUrl: 'full-register-page.component.html',
  styleUrls: ['full-register-page.component.scss'],
})
export class FullRegisterPageComponent {
  authContextService = inject(AuthContextService);

  email: Signal<string | null> = computed(() => this.authContextService.email());
  provider = computed(() => this.authContextService.provider());
  constructor() {
    console.log(this.email(), this.provider());
  }
}

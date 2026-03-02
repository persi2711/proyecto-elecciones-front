import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

import { SimpleAuthEndpoint } from '../../../../../api/endpoints/auth/simple-auth-endpoint.service';
import { SimpleLoginDto } from '../../../../../api/objects/dto/simple-login-dto';
import { LayoutService } from '../../../../../shared/services/layout.service';
import { finalize } from 'rxjs';
import { GoogleButtonComponent } from '../../buttons/google-button/google-button.component';
import { AuthService } from '../../../../../shared/services/app-auth.service';

@Component({
  standalone: true,
  imports: [
    GoogleButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
  ],
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.scss'],
})
export class LoginFormComponent {
  constructor() {}
  simpleAuthEndpoint = inject(SimpleAuthEndpoint);
  layoutService = inject(LayoutService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authSerive = inject(AuthService);

  hidePassword = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.form.invalid) return;
    const result: SimpleLoginDto = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };
    this.layoutService.showLoding();

    this.simpleAuthEndpoint
      .iniciarSesion(result)
      .pipe(finalize(() => this.layoutService.hideLoding()))
      .subscribe({
        next: (data) => {
          console.log(data);
          if (!data.verified) {
            this.router.navigateByUrl('/auth/full/confirm/' + data.token);
          } else {
            this.authSerive.setSession(data.token);
            this.layoutService.success('Inicio de sesion exitoso');
            this.router.navigateByUrl('');
          }
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          this.layoutService.error('Inicio de sesion Fallido');
        },
      });
  }

  navigateTo() {}
}

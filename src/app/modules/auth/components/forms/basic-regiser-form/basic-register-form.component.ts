import { LayoutService } from './../../../../../shared/services/layout.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { SimpleAuthEndpoint } from '../../../../../api/endpoints/auth/simple-auth-endpoint.service';

import { finalize } from 'rxjs';
import { GoogleButtonComponent } from '../../buttons/google-button/google-button.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    GoogleButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  selector: 'app-basic-register-form',
  templateUrl: 'basic-register-form.component.html',
  styleUrls: ['basic-register-form.component.scss'],
})
export class BasicRegisterFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(SimpleAuthEndpoint);
  private router = inject(Router);
  private layoutService = inject(LayoutService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
  });

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email!.trim().toLowerCase();

    this.layoutService.showLoding();

    this.api
      .validateEmail(email)
      .pipe(finalize(() => this.layoutService.hideLoding()))
      .subscribe({
        next: (data) => {
          this.router.navigate(['/auth/full/register/' + data.token]);
        },
        error: (err) => {
          console.error('Error validando email:', err);
          this.layoutService.error(
            'Este correo ya está registrado. Inicia sesión o recupera tu contraseña.',
          );
        },
      });
  }
  continueWithGoogle() {
    console.log('Google step 1');
  }
}

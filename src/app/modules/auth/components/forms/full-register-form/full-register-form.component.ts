import { Component, Input, OnInit, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from '../../../../../shared/services/layout.service';
import { SimpleAuthEndpoint } from '../../../../../api/endpoints/auth/simple-auth-endpoint.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import {
  GeneralInfoRegister,
  GoogleRegister,
  SimpleRegister,
  UserRegister,
} from '../../../../../api/objects/dto/simple-register.dto';
import { GoogleButtonService } from '../../../../../api/endpoints/auth/google-button.service';
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

@Component({
  selector: 'app-full-register-form',
  templateUrl: 'full-register-form.component.html',
  styleUrls: ['full-register-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class FullRegisterFormComponent {
  email = input.required<string>();

  provider = input<'google' | 'application'>('application');
  municipios = ['Ensenada', 'Tijuana', 'Mexicali', 'Rosarito', 'Tecate', 'San Quintín'];
  private fb = inject(FormBuilder);
  private layoutService = inject(LayoutService);
  private api = inject(SimpleAuthEndpoint);
  private router = inject(Router);
  private googleButtonService = inject(GoogleButtonService);
  matcher = new MyErrorStateMatcher();
  accountForm = this.fb.group(
    {
      email: [{ value: '', disabled: true }],
      password: [''],
      confirmPassword: [''],
      acceptTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: this.matchPasswords(),
    },
  );

  userForm = this.fb.group({
    telefono: ['', [Validators.maxLength(20)]],
    sector: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[0-9]*$')]],
    state: ['', [Validators.required]],
  });

  generalInfoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellidoP: ['', [Validators.required, Validators.maxLength(100)]],
    apellidoM: ['', [Validators.maxLength(100)]],
    genero: ['', [Validators.required]],
  });

  ngOnInit() {
    this.accountForm.patchValue({ email: this.email() });
    // Aplicar validaciones de contraseña SOLO si no es Google
    console.log(this.provider);
    if (this.provider() === 'application') {
      const p = this.accountForm.get('password');
      const cp = this.accountForm.get('confirmPassword');

      p?.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(72),
        Validators.pattern(PASSWORD_REGEX),
      ]);
      cp?.setValidators([Validators.required]);

      p?.updateValueAndValidity();
      cp?.updateValueAndValidity();
    }
  }

  async submit() {
    // 1. Validaciones previas
    if (this.generalInfoForm.invalid || this.userForm.invalid || this.accountForm.invalid) {
      this.markFormsAsTouched();
      this.layoutService.error('Por favor, completa todos los campos requeridos');
      return;
    }

    this.layoutService.showLoding();

    // 2. Construcción de los datos comunes
    const user = this.userForm.getRawValue() as UserRegister;
    const generalInfo = this.generalInfoForm.getRawValue() as GeneralInfoRegister;

    // 3. Lógica según el proveedor
    if (this.provider() === 'google') {
      const payload: GoogleRegister = {
        account: { email: this.email() }, // Solo el email para Google
        user,
        generalInfo,
      };

      this.googleButtonService.createGoogleAccount(payload).subscribe({
        next: (res) => this.handleSuccess(res.token, true),
        error: (err) => this.handleError(err),
      });
    } else {
      const payload: SimpleRegister = {
        account: {
          email: this.email(),
          password: this.accountForm.get('password')?.value!,
        },
        user,
        generalInfo,
      };

      this.api.simpleRegister(payload).subscribe({
        next: (res) => this.handleSuccess(res.token, false),
        error: (err) => this.handleError(err),
      });
    }
  }

  // Helpers para limpiar el código
  private handleSuccess(token: string, isGoogle: boolean) {
    this.layoutService.hideLoding();
    this.layoutService.success(isGoogle ? '¡Bienvenido!' : 'Cuenta creada. Verifica tu correo.');

    if (isGoogle) {
      localStorage.setItem('token', token);
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigateByUrl(`/auth/full/confirm/${token}`);
    }
  }

  private handleError(err: any) {
    this.layoutService.hideLoding();
    const msg = err.error?.message || 'Error al procesar el registro';
    this.layoutService.error(msg);
  }

  private markFormsAsTouched() {
    this.generalInfoForm.markAllAsTouched();
    this.userForm.markAllAsTouched();
    this.accountForm.markAllAsTouched();
  }
  matchPasswords(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value;

      // Si están vacíos, que actúe el Validator.required
      if (!password || !confirm) return null;

      return password === confirm ? null : { passwordMismatch: true };
    };
  }
  onlyNumbers(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}

export class MyErrorStateMatcher implements MyErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.hasError('passwordMismatch') && control?.touched);
    return invalidCtrl || invalidParent;
  }
}

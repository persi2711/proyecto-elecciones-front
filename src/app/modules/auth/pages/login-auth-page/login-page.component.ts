import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/forms/login-form/login-form.component';
@Component({
  standalone: true,
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss'],
  imports: [LoginFormComponent],
})
export class LoginPageComponent {}

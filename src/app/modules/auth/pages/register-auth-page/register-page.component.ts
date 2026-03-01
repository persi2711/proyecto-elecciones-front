import { Component, OnInit } from '@angular/core';
import { BasicRegisterFormComponent } from '../../components/forms/basic-regiser-form/basic-register-form.component';

@Component({
  standalone: true,
  imports: [BasicRegisterFormComponent],
  selector: 'app-register-page',
  templateUrl: 'register-page.component.html',
  styleUrls: ['register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

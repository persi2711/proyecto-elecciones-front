import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-full-register-layout',
  templateUrl: 'full-register-layout.component.html',
  styleUrls: ['full-register-layout.component.scss'],
})
export class FullRegisterLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

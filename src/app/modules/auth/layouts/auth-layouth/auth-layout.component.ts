import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatCardModule, RouterOutlet, CommonModule],
  selector: 'app-auth-layout',
  templateUrl: 'auth-layout.component.html',
  styleUrls: ['auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

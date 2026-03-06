import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-process-section',
  templateUrl: 'process-section.component.html',
  styleUrls: ['process-section.component.scss'],
})
export class ProcessSectionComponent implements OnInit {
  constructor() {}
  router = inject(Router);

  navigateToLogin() {
    console.log('me ejecute');
    this.router.navigateByUrl('/auth/register');
  }
  ngOnInit() {}
}

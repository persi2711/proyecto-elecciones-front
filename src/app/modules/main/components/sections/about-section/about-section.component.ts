import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-about-section',
  templateUrl: 'about-section.component.html',
  styleUrls: ['about-section.component.scss'],
})
export class AboutSectionComponent implements OnInit {
  constructor() {}
  router = inject(Router);
  navigateToabout() {
    this.router.navigateByUrl('/about-project');
  }
  ngOnInit() {}
}

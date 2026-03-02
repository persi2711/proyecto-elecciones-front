import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-footer',
  templateUrl: 'app-footer.component.html',
  styleUrls: ['app-footer.component.scss'],
})
export class AppFooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

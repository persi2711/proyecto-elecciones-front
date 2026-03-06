import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  selector: 'app-footer',
  templateUrl: 'app-footer.component.html',
  styleUrls: ['app-footer.component.scss'],
})
export class AppFooterComponent implements OnInit {
  public layoutService = inject(LayoutService);
  constructor() {}

  ngOnInit() {}

  openContact() {
    this.layoutService.openContact();
  }
}

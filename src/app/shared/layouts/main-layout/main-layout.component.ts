import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AppFooterComponent } from '../../components/footer-component.ts/app-footer.component';
import { AppHederComponent } from '../../components/heder-component/app-heder.component';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { AuthService } from '../../services/app-auth.service';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    AppHederComponent,
    SidebarMenuComponent,
    RouterOutlet,
    AppFooterComponent,
  ],
  selector: 'MainLayoutComponent',
  templateUrl: 'main-layout.component.html',
  styleUrls: ['main-layout.component.scss'],
})
export class MainLayoutComponent {
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;
}

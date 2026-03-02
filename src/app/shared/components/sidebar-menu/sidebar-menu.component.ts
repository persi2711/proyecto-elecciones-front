import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from '../../services/layout.service';
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  selector: 'app-sidebar-menu',
  templateUrl: 'sidebar-menu.component.html',
  styleUrls: ['sidebar-menu.component.scss'],
  host: {
    '[class.sidebar-open]': 'layoutService.showSidebar()',
  },
})
export class SidebarMenuComponent {
  layoutService = inject(LayoutService);

  readonly showSidebar = this.layoutService.showSidebar;
  readonly navRoutes = this.layoutService.navRoutes;

  closeSidebar() {
    this.layoutService.closeSidebar();
  }

  closeMenu() {
    this.layoutService.closeSidebar();
  }

  onMenuChanege = effect(() => {
    console.log('Sidebar:', this.showSidebar());
  });
}

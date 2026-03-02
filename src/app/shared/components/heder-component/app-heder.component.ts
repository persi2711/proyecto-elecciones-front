import { Component, inject, signal, input, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '../../services/layout.service';
import { UserSession } from '../../../api/objects/dto/user-sesion-dto';
import { AuthService } from '../../services/app-auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  selector: 'app-heder',
  templateUrl: 'app-heder.component.html',
  styleUrls: ['app-heder.component.scss'],
  host: {
    '[class.scrolled]': 'isScrolled()',
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class AppHederComponent {
  private platformId = inject(PLATFORM_ID);
  protected isBrowser = signal(false);
  protected authService = inject(AuthService);
  isChecking = this.authService.isChecking;
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser.set(true);
    }
  }
  protected layoutService = inject(LayoutService);
  user = input<any>();

  protected isScrolled = signal(false);

  protected onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled.set(scrollY > 20);
  }
  openSideBar() {
    this.layoutService.toggleSidebar();
    console.log(this.layoutService.showSidebar());
  }
}

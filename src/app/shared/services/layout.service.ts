import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactModalComponent } from '../components/contact-modal/contact-modal.component';
interface NavLink {
  label: string;
  path: string;
  icon?: string;
}
@Injectable({ providedIn: 'root' })
export class LayoutService {
  constructor() {}
  private _loading = signal(false);
  loading = this._loading.asReadonly();
  private _showSidebar = signal(false);
  showSidebar = this._showSidebar.asReadonly();
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  navRoutes = signal<NavLink[]>([
    { label: 'Incio', path: '/home', icon: 'home' },
    { label: 'Eventos', path: '/events', icon: 'tab_group' },
    { label: 'Participantes', path: '/participants', icon: 'groups' },
    { label: 'Sobre el proyecto', path: '/about-project', icon: 'pageview' },
    { label: 'Consejo Ciudadano', path: '/consejo ciudadano', icon: 'open_in_new' },
  ]);

  showLoding() {
    this._loading.set(true);
  }

  hideLoding() {
    this._loading.set(false);
  }

  success(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['alert-success'],
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['alert-error'],
    });
  }
  info(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  toggleSidebar() {
    this._showSidebar.update((v) => !v);
  }
  closeSidebar() {
    this._showSidebar.set(false);
  }

  openContact() {
    this.dialog.open(ContactModalComponent, {
      width: '450px',
      maxWidth: '90vw',
    });
  }
}

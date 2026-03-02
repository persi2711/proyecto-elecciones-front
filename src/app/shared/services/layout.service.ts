import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  navRoutes = signal<NavLink[]>([
    { label: 'Incio', path: '/', icon: 'home' },
    { label: 'Eventos', path: '/events', icon: 'home' },
    { label: 'Partipantes', path: '/participants', icon: 'newspaper' },
    { label: 'Sobre el proyecto', path: '/proyect', icon: 'explore' },
    { label: 'Consejo Ciudadano', path: '/consejo ciudadano', icon: 'explore' },
  ]);

  showLoding() {
    this._loading.set(true);
  }

  hideLoding() {
    this._loading.set(false);
  }

  private snackBar = inject(MatSnackBar);

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
}

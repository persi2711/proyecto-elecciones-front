import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  constructor() {}
  private _loading = signal(false);
  loading = this._loading.asReadonly();

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
}

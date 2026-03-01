import { HttpClient } from '@angular/common/http';
import { afterNextRender, Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleButtonService } from '../../../../../api/endpoints/auth/google-button.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-google-button',
  templateUrl: 'google-button.component.html',
  styleUrls: ['google-button.component.scss'],
  providers: [],
})
export class GoogleButtonComponent {
  private googleService = inject(GoogleButtonService); // Inyectamos tu servicio
  googleBtn = viewChild.required<ElementRef>('googleBtnContainer');

  constructor() {
    // afterNextRender es perfecto para librerías de terceros (Google, Charts, etc)
    // porque solo se ejecuta en el navegador y cuando el HTML ya existe.
    afterNextRender(() => {
      const element = this.googleBtn().nativeElement;
      this.googleService.renderGoogleButton(element);
    });
  }
}

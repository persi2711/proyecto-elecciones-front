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
  private googleService = inject(GoogleButtonService);
  googleBtn = viewChild.required<ElementRef>('googleBtnContainer');

  constructor() {
    afterNextRender(() => {
      const element = this.googleBtn().nativeElement;
      this.googleService.renderGoogleButton(element);
    });
  }
}

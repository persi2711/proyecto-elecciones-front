import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  selector: 'app-client-only',
  templateUrl: 'client-only.component.html',
})
export class ClientOnlyComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  constructor() {}

  ngOnInit() {}
}

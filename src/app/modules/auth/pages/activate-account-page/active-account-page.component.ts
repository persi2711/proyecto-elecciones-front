import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-active-account-page',
  templateUrl: 'active-account-page.component.html',
  styleUrls: ['active-account-page.component.scss'],
})
export class ActiveAccountPageComponent implements OnInit {
  private router = inject(Router);
  countdown = signal(5);

  ngOnInit() {
    const interval = setInterval(() => {
      this.countdown.update((v) => v - 1);
      if (this.countdown() <= 0) {
        clearInterval(interval);
        this.router.navigateByUrl(''); // O tu ruta principal
      }
    }, 1000);
  }

  navigateTo() {
    this.router.navigateByUrl('');
  }
}

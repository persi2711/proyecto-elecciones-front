import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { SimpleAuthEndpoint } from '../../../../api/endpoints/auth/simple-auth-endpoint.service';
import { LayoutService } from '../../../../shared/services/layout.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [RouterModule, MatCardModule],
  selector: 'app-send-confirm-page',
  templateUrl: 'send-confirm-page.component.html',
  styleUrls: ['send-confirm-page.component.scss'],
})
export class SendConfirmPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(SimpleAuthEndpoint);
  private layoutService = inject(LayoutService);

  token = this.route.snapshot.params['token'];
  loading = signal(false);
  emailSent = signal(false);
  cooldownSeconds = signal(0);

  ngOnInit() {
    this.sendEmail();
  }

  sendEmail() {
    if (this.cooldownSeconds() > 0 || this.loading()) return;

    this.loading.set(true);
    this.emailSent.set(false);

    this.api.sendEmail(this.token).subscribe({
      next: (res) => {
        this.loading.set(false);

        if (res.emailSend || res.cooldown) {
          this.emailSent.set(true);
        }

        if (res.cooldown) {
          this.startCountdown(new Date(res.cooldown));
        }

        if (res.emailSend) {
          this.layoutService.success('Correo de confirmación enviado');
        }
      },
      error: (err) => {
        this.loading.set(false);

        this.emailSent.set(false);

        const msg = err.error?.message || 'Error al procesar la solicitud';
        this.layoutService.error(msg);
      },
    });
  }
  private startCountdown(targetDate: Date) {
    const update = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((targetDate.getTime() - now) / 1000));
      this.cooldownSeconds.set(diff);
      if (diff > 0) setTimeout(update, 1000);
    };
    update();
  }
}

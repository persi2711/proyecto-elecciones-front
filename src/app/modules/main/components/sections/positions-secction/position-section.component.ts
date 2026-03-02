import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-position-section',
  templateUrl: 'position-section.component.html',
  styleUrls: ['position-section.component.scss'],
})
export class PositionSectionComponent implements OnInit {
  loading = signal(true);
  positions = signal<any[]>([]);

  ngOnInit() {
    setTimeout(() => {
      this.positions.set([
        {
          id: 1,
          iconName: 'account_balance',
          title: 'Presidencia Municipal',
          location: 'Tijuana, BC',
          description: 'Lidera la administración local y propone soluciones ciudadanas.',
          limitDate: '20 Abril',
          endDate: '05 Mayo',
        },
        {
          id: 2,
          iconName: 'account_balance',
          title: 'Presidencia Municipal',
          location: 'Tijuana, BC',
          description: 'Lidera la administración local y propone soluciones ciudadanas.',
          limitDate: '20 Abril',
          endDate: '05 Mayo',
        },
        {
          id: 3,
          iconName: 'account_balance',
          title: 'Presidencia Municipal',
          location: 'Tijuana, BC',
          description: 'Lidera la administración local y propone soluciones ciudadanas.',
          limitDate: '20 Abril',
          endDate: '05 Mayo',
        },
      ]);
      this.loading.set(false);
    }, 2500);
  }
}

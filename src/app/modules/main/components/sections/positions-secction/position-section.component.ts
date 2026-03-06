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
      this.positions.set([]);
      this.loading.set(false);
    }, 2500);
  }
}

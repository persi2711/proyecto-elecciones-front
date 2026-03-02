import { afterRenderEffect, Component, ElementRef, OnInit, signal, viewChild } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-stats-section',
  templateUrl: 'stats-section.component.html',
  styleUrls: ['stats-section.component.scss'],
})
export class StatsSectionComponent {
  statsLoaded = signal(false);

  postulados = signal(0);
  apoyos = signal(0);
  convocatorias = signal(0);

  private section = viewChild<ElementRef>('statsSection');

  constructor() {
    afterRenderEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.statsLoaded()) {
            this.startCounting();
          }
        },
        { threshold: 0.5 },
      );

      if (this.section()?.nativeElement) {
        observer.observe(this.section()!.nativeElement);
      }
    });
  }

  private startCounting() {
    this.statsLoaded.set(true);
    this.animateValue(this.postulados, 500, 2000);
    this.animateValue(this.apoyos, 12000, 2500, 'k');
    this.animateValue(this.convocatorias, 24, 1500);
  }

  private animateValue(signalRef: any, target: number, duration: number, suffix = '') {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      signalRef.set(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}

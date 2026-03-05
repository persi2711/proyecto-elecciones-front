import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  Input,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
export interface Slide {
  id: number;
  imageUrl: string;
  alt: string;
  numberText: string;
  caption: string;
}
@Component({
  selector: 'app-hero-slider',
  standalone: true,
  templateUrl: 'hero-slider.component.html',
  styleUrls: ['hero-slider.component.scss'],
  imports: [CommonModule],
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  private baseSlides: Slide[] = [
    {
      id: 1,
      imageUrl: 'https://www.ensenada.gob.mx/wp-content/uploads/2025/07/Teatro.jpg',
      alt: 'BC',
      numberText: '01',
      caption: 'Impulsando a las personas',
    },
    {
      id: 2,
      imageUrl: 'https://www.ensenada.gob.mx/wp-content/uploads/2025/07/Riviera.jpg',
      alt: 'Social',
      numberText: '02',
      caption: 'Impulsando el cambio',
    },
    {
      id: 3,
      imageUrl: 'https://www.ensenada.gob.mx/wp-content/uploads/2025/07/Riviera.jpg',
      alt: 'Futuro',
      numberText: '03',
      caption: 'Construyendo el futuro',
    },
  ];

  slidesList = input<Slide[]>([...this.baseSlides, ...this.baseSlides, ...this.baseSlides]);
  currentIndex = signal(0);
  isJumping = signal(false);
  isPaused = signal(false);

  isAnimating = signal(false);

  private autoPlayInterval: any;
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  ngOnInit() {
    this.currentIndex.set(this.baseSlides.length);
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    if (isPlatformBrowser(this.platformId) && !this.isPaused()) {
      this.ngZone.runOutsideAngular(() => {
        this.autoPlayInterval = setInterval(() => {
          this.ngZone.run(() => {
            this.nextSlide();
          });
        }, 4000);
      });
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  togglePause() {
    if (this.isJumping()) return;

    const newPausedState = !this.isPaused();
    this.isPaused.set(newPausedState);

    if (newPausedState) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  nextSlide() {
    if (this.isPaused() || this.isAnimating() || this.isJumping()) return;

    this.isAnimating.set(true);
    this.currentIndex.update((i) => i + 1);

    setTimeout(() => {
      this.isAnimating.set(false);
      this.checkInfiniteLoop();
    }, 1000);
  }

  private checkInfiniteLoop() {
    if (this.currentIndex() >= this.baseSlides.length * 2) {
      this.isJumping.set(true);
      this.currentIndex.set(this.baseSlides.length);

      setTimeout(() => {
        this.isJumping.set(false);
      }, 50);
    }
  }
}

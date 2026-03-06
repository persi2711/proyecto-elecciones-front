import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { HeroSliderComponent } from './slider-component/hero-slider.component';
import { HeroInfoComponent } from './hero-info-component/hero-info.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  imports: [HeroInfoComponent, HeroSliderComponent],
  selector: 'app-hero-section',
  templateUrl: 'hero-section.component.html',
  styleUrls: ['hero-section.component.scss'],
})
export class HeroSectionComponent {
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth', // El scroll será fluido, no de golpe
        block: 'start', // Alinea al inicio de la sección
        inline: 'nearest',
      });
    }
  }
}

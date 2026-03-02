import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeroSectionComponent } from '../../components/sections/hero-section/hero-section.component';
import { AboutSectionComponent } from '../../components/sections/about-section/about-section.component';
import { ProcessSectionComponent } from '../../components/sections/process-section/process-section.component';
import { StatsSectionComponent } from '../../components/sections/stats-section/stats-section.component';
import { FeaturedSectionComponent } from '../../components/sections/featured-secition/featured-section.component';
import { PositionSectionComponent } from '../../components/sections/positions-secction/position-section.component';
import { FaqSectionComponent } from '../../components/sections/faq-secction/faq-section.component';
import { FinalCtaSecctionComponent } from '../../components/sections/final-cta-secction/final-cta-secction.component';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    ProcessSectionComponent,
    StatsSectionComponent,
    FeaturedSectionComponent,
    PositionSectionComponent,
    FaqSectionComponent,
    FinalCtaSecctionComponent,
  ],
  templateUrl: 'start-page.component.html',
  styleUrls: ['start-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

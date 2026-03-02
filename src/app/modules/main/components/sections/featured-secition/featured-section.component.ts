import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-featured-section',
  templateUrl: 'featured-section.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  styleUrls: ['featured-section.component.scss'],
})
export class FeaturedSectionComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  private track = viewChild<ElementRef>('carouselTrack');
  private autoplayInterval: any;

  loading = signal(true);
  users = signal<any[]>([]);

  ngOnInit() {
    this.loadCandidates();
    this.initAutoplayLogic();
  }

  private loadCandidates() {
    setTimeout(() => {
      this.users.set([
        {
          id: 1,
          name: 'Juan Pérez',
          city: 'Tijuana',
          title: 'Activista Ambiental',
          bio: 'Recuperando espacios verdes en la zona este desde hace 10 años.',
          votes: 450,
          photo:
            'https://media.istockphoto.com/id/1171169099/es/foto/hombre-con-brazos-cruzados-aislados-sobre-fondo-gris.jpg?s=612x612&w=0&k=20&c=8qDLKdLMm2i8DHXY6crX6a5omVh2IxqrOxJV2QGzgFg=',
        },
        {
          id: 2,
          name: 'María Flores',
          city: 'Ensenada',
          title: 'Líder Comunitaria',
          bio: 'Gestión de desayunos escolares para niños en zonas rurales.',
          votes: 820,
          photo:
            'https://img.freepik.com/foto-gratis/estilo-vida-emociones-gente-concepto-casual-confiado-agradable-sonriente-mujer-asiatica-brazos-cruzados-pecho-seguro-listo-ayudar-escuchando-companeros-trabajo-participando-conversacion_1258-59335.jpg?semt=ais_hybrid&w=740&q=80',
        },
        {
          id: 3,
          name: 'Juan Pérez',
          city: 'Tijuana',
          title: 'Activista Ambiental',
          bio: 'Recuperando espacios verdes en la zona este desde hace 10 años.',
          votes: 450,
          photo:
            'https://img.freepik.com/foto-gratis/joven-hombre-barbudo-camisa-rayas_273609-5677.jpg?semt=ais_rp_progressive&w=740&q=80',
        },
        {
          id: 4,
          name: 'Juan Pérez',
          city: 'Tijuana',
          title: 'Activista Ambiental',
          bio: 'Recuperando espacios verdes en la zona este desde hace 10 años.',
          votes: 450,
          photo:
            'https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=',
        },
        {
          id: 5,
          name: 'Juan Pérez',
          city: 'Tijuana',
          title: 'Activista Ambiental',
          bio: 'Recuperando espacios verdes en la zona este desde hace 10 años.',
          votes: 450,
          photo:
            'https://img.freepik.com/foto-gratis/joven-hombre-barbudo-camisa-rayas_273609-5677.jpg?semt=ais_rp_progressive&w=740&q=80',
        },
      ]);
      this.loading.set(false);
    }, 3000);
  }

  initAutoplayLogic() {
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 768) {
      this.startAutoplay();
    }
  }

  startAutoplay() {
    if (this.autoplayInterval) return;

    this.autoplayInterval = setInterval(() => {
      const el = this.track()?.nativeElement;
      if (el) {
        const isAtEnd = el.scrollLeft + el.offsetWidth >= el.scrollWidth - 20;

        if (isAtEnd) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 4500);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  scrollNext() {
    this.track()?.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  scrollPrev() {
    this.track()?.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }
}

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
export class FeaturedSectionComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private track = viewChild<ElementRef>('carouselTrack');

  loading = signal(true);
  users = signal<any[]>([]);
  activeIndex = signal(0);

  ngOnInit() {
    this.loadCandidates();
  }

  private loadCandidates() {
    // Simulamos carga de Backend (2.5s para apreciar el skeleton)
    setTimeout(() => {
      this.users.set([
        {
          id: 1,
          name: 'Juan Pérez',
          city: 'Tijuana',
          title: 'Activista Ambiental',
          bio: 'Dedicado a la recuperación de espacios verdes y reforestación en la zona este de Tijuana, logrando transformar basureros clandestinos en parques para la comunidad.',
          votes: 450,
          photo:
            'https://media.istockphoto.com/id/1171169099/es/foto/hombre-con-brazos-cruzados-aislados-sobre-fondo-gris.jpg?s=612x612&w=0&k=20&c=8qDLKdLMm2i8DHXY6crX6a5omVh2IxqrOxJV2QGzgFg=',
        },
        {
          id: 2,
          name: 'María Flores',
          city: 'Ensenada',
          title: 'Líder Comunitaria',
          bio: 'Gestión de desayunos escolares para niños en zonas rurales de Ensenada y apoyo constante a madres trabajadoras mediante estancias infantiles autogestivas.',
          votes: 820,
          photo:
            'https://img.freepik.com/foto-gratis/estilo-vida-emociones-gente-concepto-casual-confiado-agradable-sonriente-mujer-asiatica-brazos-cruzados-pecho-seguro-listo-ayudar-escuchando-companeros-trabajo-participando-conversacion_1258-59335.jpg?semt=ais_hybrid&w=740&q=80',
        },
        {
          id: 3,
          name: 'Carlos Mendoza',
          city: 'Mexicali',
          title: 'Gestor Social',
          bio: 'Impulsor de programas de hidratación y refugios temporales para personas en situación de calle durante las olas de calor extremo en la capital del estado.',
          votes: 310,
          photo:
            'https://img.freepik.com/foto-gratis/joven-hombre-barbudo-camisa-rayas_273609-5677.jpg?semt=ais_rp_progressive&w=740&q=80',
        },
      ]);
      this.loading.set(false);
    }, 2500);
  }

  onScroll(event: Event) {
    const el = event.target as HTMLElement;
    // Usamos scrollLeft / clientWidth para obtener el índice exacto
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (this.activeIndex() !== index) {
      this.activeIndex.set(index);
    }
  }

  goToIndex(index: number) {
    const el = this.track()?.nativeElement;
    if (el) {
      el.scrollTo({
        left: index * el.offsetWidth,
        behavior: 'smooth',
      });
      this.activeIndex.set(index);
    }
  }

  // NAVEGACIÓN CIRCULAR
  scrollNext() {
    // El total es la longitud de la lista de usuarios + 1 (tarjeta "Ver todos")
    const totalItems = this.users().length + 1;
    const next = this.activeIndex() + 1;

    if (next < totalItems) {
      this.goToIndex(next);
    } else {
      this.goToIndex(0); // Regresa al primer perfil
    }
  }

  scrollPrev() {
    const totalItems = this.users().length + 1;
    const prev = this.activeIndex() - 1;

    if (prev >= 0) {
      this.goToIndex(prev);
    } else {
      // Si estamos en el primero y damos atrás, salta a la tarjeta "Ver todos"
      this.goToIndex(totalItems - 1);
    }
  }
}

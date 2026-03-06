import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatIconModule, RouterLink],
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
          iconName: 'health_and_safety', // Icono de Salud
          title: 'Liderazgo en Salud y Bienestar',
          location: 'Mexicali, BC',
          description:
            'Visibilización de trayectorias dedicadas a la gestión de salud comunitaria y apoyo social.',
          limitDate: '20 Abril',
          endDate: '05 Mayo',
        },
        {
          id: 2,
          iconName: 'gavel', // Icono de Justicia/Derechos
          title: 'Derechos Humanos y Mediación',
          location: 'Tijuana, BC',
          description:
            'Perfiles con experiencia probada en defensa de derechos, justicia social y acompañamiento ciudadano.',
          limitDate: '20 Abril',
          endDate: '05 Mayo',
        },
        {
          id: 3,
          iconName: 'psychology', // Icono de Educación/Mente
          title: 'Educación y Desarrollo Comunitario',
          location: 'Ensenada, BC',
          description:
            'Reconocimiento a ciudadanos que han impulsado la educación y el tejido social sin cargos públicos.',
          limitDate: '20 Abril',
          endDate: '05 Mayo',
        },
      ]);
      this.loading.set(false);
    }, 2500);
  }
}

import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTabsModule, MatTooltipModule],
  selector: 'app-profile-page',
  templateUrl: 'profile-page.component.html',
  styleUrls: ['profile-page.component.scss'],
})
export class ProfilePageComponent {
  userProfile = signal({
    name: 'Juan',
    lastNameP: 'Pérez',
    lastNameM: 'Gómez',
    description:
      'Activista comunitario enfocado en la recuperación de espacios públicos y educación ambiental en zonas urbanas de Baja California. Con más de 5 años de experiencia liderando jornadas de reforestación.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=256&h=256',
    publicContact: {
      web: 'www.juanperez-bc.org',
      phone: '664 123 4567',
      email: 'hola@juanperez-bc.org',
    },
    lifeWays: [
      {
        typeLifeWay: 'social',
        title: 'Fundador de "Parques Vivos"',
        institution: 'A.C. Parques Vivos',
        description: 'Coordinación de voluntarios.',
        initDate: '2020',
        finishDate: 'Presente',
      },
      {
        typeLifeWay: 'laboral',
        title: 'Coordinador de Proyectos',
        institution: 'EcoSoluciones',
        description: 'Gestión de impacto ambiental.',
        initDate: '2018',
        finishDate: '2020',
      },
      {
        typeLifeWay: 'academica',
        title: 'Lic. en Ciencias Ambientales',
        institution: 'UABC',
        description: 'Especialidad en ecosistemas urbanos.',
        initDate: '2014',
        finishDate: '2018',
      },
    ],
    resource: {
      cvDocument: 'juan_perez_cv_2026.pdf',
    },
    isPublic: true,
  });

  // --- SEÑALES COMPUTADAS PARA LOS TABS ---
  socialLifeWays = computed(() =>
    this.userProfile().lifeWays.filter((w) => w.typeLifeWay === 'social'),
  );
  laboralLifeWays = computed(() =>
    this.userProfile().lifeWays.filter((w) => w.typeLifeWay === 'laboral'),
  );
  academicLifeWays = computed(() =>
    this.userProfile().lifeWays.filter((w) => w.typeLifeWay === 'academica'),
  );

  // --- ACCIONES DE EDICIÓN INDEPENDIENTE ---
  editPhoto() {
    console.log('Editando foto...');
  }
  editDescription() {
    console.log('Editando descripción...');
  }
  editContact() {
    console.log('Editando contacto...');
  }
  editCV() {
    console.log('Subiendo nuevo CV...');
  }
  addLifeWay(type: string) {
    console.log(`Añadiendo trayectoria ${type}...`);
  }

  // --- BARRA DE HERRAMIENTAS ---
  openSettings() {
    console.log('Abriendo configuración (Datos privados y apoyos)...');
  }
  togglePrivacy() {
    this.userProfile.update((p) => ({ ...p, isPublic: !p.isPublic }));
  }
  logout() {
    console.log('Cerrando sesión...');
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  standalone: true,
  imports: [MatIconModule, MatExpansionModule],
  selector: 'app-faq-section',
  templateUrl: 'faq-section.component.html',
  styleUrls: ['faq-section.component.scss'],
})
export class FaqSectionComponent implements OnInit {
  constructor() {}
  faqs = signal([
    {
      question: '¿Mi postulación es vinculante ante el IEE o el INE?',
      answer:
        'No. Este es un ejercicio ciudadano organizado por el Consejo Ciudadano de BC. No sustituye ni interfiere con los procesos electorales oficiales, su fin es dar visibilidad al liderazgo civil.',
    },
    {
      question: '¿Por qué mi perfil no aparece inmediatamente?',
      answer:
        'Para garantizar la seriedad de la plataforma, el Consejo revisa que cada solicitud cumpla con los requisitos y que el cuestionario de opinión haya sido completado con coherencia.',
    },
    {
      question: '¿Qué beneficios obtengo si tengo más "Likes"?',
      answer:
        'El apoyo ciudadano (likes) sirve como termómetro de confianza y validación social dentro de la plataforma, ayudando a que otros ciudadanos identifiquen perfiles con trayectoria y respaldo real.',
    },
  ]);
  ngOnInit() {}
}

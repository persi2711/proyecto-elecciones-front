import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { UserProfilePageComponent } from './pages/user-profile-main-page/user-profile-page.component';
import { ClientOnlyComponent } from '../../shared/layouts/client-only/client-only.component';
import { MainLayoutComponent } from '../../shared/layouts/main-layout/main-layout.component';
import { PrivacyAgreementComponent } from './pages/privacy-agreement/privacy-agreement.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { SelectedEventsPageComponent } from './pages/events-page/selected-events-page/selected-events-page.component';
import { MainEventsPageComponent } from './pages/events-page/main-events-page/main-events-page.component';
import { SelectedParticipantsPageComponent } from './pages/participants-page/selected-participants-page/selected-participants-page.component';
import { MainParticipantsPageComponent } from './pages/participants-page/main-participants-page/main-participants-page.component';
import { AboutProjectPageComponent } from './pages/about-project-page/about-project-page.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: StartPageComponent,
      },
      {
        path: 'privacy-agreement',
        component: PrivacyAgreementComponent,
      },
      {
        path: 'terms-conditions',
        component: TermsAndConditionsComponent,
      },
      {
        path: 'participants',
        component: MainParticipantsPageComponent,
      },

      {
        path: 'participants/:id',
        component: SelectedParticipantsPageComponent,
      },
      {
        path: 'events',
        component: MainEventsPageComponent,
      },
      {
        path: 'events/:id',
        component: SelectedEventsPageComponent,
      },
      {
        path: 'about-project',
        component: AboutProjectPageComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/home' },
];

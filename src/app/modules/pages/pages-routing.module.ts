import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { InfoPayComponent } from './info-pay/info-pay.component';
import { PagesComponent } from './pages.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SearchHotelsComponent } from './search-hotels/search-hotels.component';
import { TermsComponent } from './terms/terms.component';
import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { TransportBookingComponent } from './transport-booking/transport-booking.component';
import { SearchPageComponent } from './transport-booking/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'hotels',
        component: HotelsComponent,
      },
      {
        path: 'contact',
        component: ContactUsComponent,
      },
      {
        path: 'search',
        component: SearchHotelsComponent,
      },
      {
        path: 'destinations',
        component: DestinationsComponent,
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent,
      },
      {
        path: 'details/:hotelId',
        component: DetailsComponent,
      },
      {
        path: 'info-paiement',
        component: InfoPayComponent,
      },
      {
        path: 'paiement',
        component: PaiementComponent,
      },
      {
        path: 'terms-of-use',
        component: TermsComponent,
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'booking-success',
        component: BookingSuccessComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'reservations',
        component: ReservationsComponent,
      },
      {
        path: 'transport-booking',
        loadChildren: () =>
          import('./transport-booking/transport-booking.module').then(
            (m) => m.TransportBookingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

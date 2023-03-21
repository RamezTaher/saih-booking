import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HotelsComponent } from './hotels/hotels.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SearchHotelsComponent } from './search-hotels/search-hotels.component';
import { DetailsComponent } from './details/details.component';
import { InfoPayComponent } from './info-pay/info-pay.component';
import { PaiementComponent } from './paiement/paiement.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DestinationsComponent } from './destinations/destinations.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CardReservationComponent } from './reservations/card-reservation/card-reservation.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TransportBookingComponent } from './transport-booking/transport-booking.component';
import { SearchPageComponent } from './transport-booking/search-page/search-page.component';
import { TransportBookingModule } from './transport-booking/transport-booking.module';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    HotelsComponent,
    ContactUsComponent,
    SearchHotelsComponent,
    DetailsComponent,
    InfoPayComponent,
    PaiementComponent,
    TermsComponent,
    PrivacyPolicyComponent,
    BookingSuccessComponent,
    MyBookingsComponent,
    DestinationsComponent,
    ProfileComponent,
    ReservationsComponent,
    CardReservationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CarouselModule,
    TransportBookingModule
  ],
  providers: [],
})
export class PagesModule {}

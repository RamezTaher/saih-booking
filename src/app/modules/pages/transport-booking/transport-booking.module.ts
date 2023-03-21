import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportBookingRoutingModule } from './transport-booking-routing.module';
import { SearchPageComponent } from './search-page/search-page.component';
import { TransportBookingComponent } from './transport-booking.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PricingDetailsComponent } from './pricing-details/pricing-details.component';
import { PaymentComponent } from './payment/payment.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

@NgModule({
  declarations: [SearchPageComponent, TransportBookingComponent, PricingDetailsComponent, PaymentComponent],
  imports: [
    CommonModule,
    TransportBookingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    TimepickerModule
  ],
  exports: [SearchPageComponent, TransportBookingComponent],
})
export class TransportBookingModule {}

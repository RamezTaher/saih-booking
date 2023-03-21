import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { PricingDetailsComponent } from './pricing-details/pricing-details.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { TransportBookingComponent } from './transport-booking.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TransportBookingComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'payment/:id',
        component: PaymentComponent,
      },
      {
        path: 'details/:id',
        component: PricingDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportBookingRoutingModule {}

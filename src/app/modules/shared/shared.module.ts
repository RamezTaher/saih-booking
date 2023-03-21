import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { HeaderComponent } from './components/header/header.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DirectionsComponent } from './components/directions/directions.component';
import { HotelItemComponent } from './components/hotel-item/hotel-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ChoiceCardComponent } from './components/choice-card/choice-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { ClassificatorComponent } from './components/classificator/classificator.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { RoomItemComponent } from './components/room-item/room-item.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BoxStarsComponent, MaskComponent } from 'sharedComponents';
import { GoogleMapsModule } from '@angular/google-maps';
import { CardLoaderComponent } from './components/card-loader/card-loader.component';
import { BookingsFilterComponent } from './components/bookings-filter/bookings-filter.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { ClickAwayDirective } from './directives/click-away/click-away.directive';
import { ReservationStateComponent } from './components/reservation-state/reservation-state.component';
import { HttpErrorMessageComponent } from './components/http-error-message/http-error-message.component';
import { UserPopupComponent } from './components/user-popup/user-popup.component';
import { TransportActionsComponent } from './components/transport-booking-search-bar/transport-actions/transport-actions.component';
import { TransportBookingSearchBarComponent } from './components/transport-booking-search-bar/transport-booking-search-bar.component';
import { TransportVehiclesComponent } from './components/transport-booking-search-bar/transport-vehicles/transport-vehicles.component';
import { TransportCategoriesComponent } from './components/transport-booking-search-bar/transport-categories/transport-categories.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { TransportationSideFilterComponent } from './components/transportation-side-filter/transportation-side-filter.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DatePickerComponent,
    DirectionsComponent,
    HotelItemComponent,
    FooterComponent,
    PaginatorComponent,
    ChoiceCardComponent,
    FilterComponent,
    ClassificatorComponent,
    HotelCardComponent,
    RoomItemComponent,
    BreadcrumbComponent,
    BoxStarsComponent,
    MaskComponent,
    CardLoaderComponent,
    BookingsFilterComponent,
    CustomSelectComponent,
    ClickAwayDirective,
    ReservationStateComponent,
    HttpErrorMessageComponent,
    UserPopupComponent,
    TransportActionsComponent,
    TransportBookingSearchBarComponent,
    TransportVehiclesComponent,
    TransportCategoriesComponent,
    VehicleCardComponent,
    TransportationSideFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule,
    BsDatepickerModule.forRoot(),
    AuthModule,
    GoogleMapsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    TranslateModule,
    AuthModule,
    BsDatepickerModule,
    DatePickerComponent,
    DirectionsComponent,
    HotelItemComponent,
    FooterComponent,
    PaginatorComponent,
    ChoiceCardComponent,
    FilterComponent,
    ClassificatorComponent,
    HotelCardComponent,
    RoomItemComponent,
    BreadcrumbComponent,
    BoxStarsComponent,
    MaskComponent,
    GoogleMapsModule,
    CardLoaderComponent,
    BookingsFilterComponent,
    CustomSelectComponent,
    ClickAwayDirective,
    ReservationStateComponent,
    HttpErrorMessageComponent,
    UserPopupComponent,
    TransportActionsComponent,
    TransportVehiclesComponent,
    TransportBookingSearchBarComponent,
    TransportCategoriesComponent,
    VehicleCardComponent,
    TransportationSideFilterComponent
  ],
})
export class SharedModule {}

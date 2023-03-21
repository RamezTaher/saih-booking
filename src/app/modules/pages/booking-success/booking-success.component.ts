import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'sharedServices';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.scss'],
})
export class BookingSuccessComponent implements OnInit {
  user_form = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.email, Validators.required]),
    Phone: new FormControl('', Validators.required),
    Notes: new FormControl(''),
  });

  total_price = 0;
  total_vat = 0;
  total_without_vat = 0;

  url_share_booking = '';
  payment_type = 'transfer';
  payment_verified = true;
  rooms: any = [];
  hotel: any;
  constructor(
    private activeRoute: ActivatedRoute,
    public storageService: StorageService,
    public translate: TranslateService
  ) {
    this.activeRoute.queryParams.subscribe((params) => {
      this.url_share_booking = params['url'] ?? this.url_share_booking;
      this.payment_type = params['payment_type'] ?? this.payment_type;
      this.payment_verified = params['payment_verified']
        ? params['payment_verified'] === 'A'
        : this.payment_verified;
    });
  }

  ngOnInit(): void {
    this.rooms = this.storageService.selectedRooms;
    this.hotel = this.storageService.hotel;

    this.rooms.forEach((x: any) => {
      this.total_price = this.total_price + x.PriceToPay * x.Quantity;
    });
    this.total_vat = this.total_price * 0.15;
    this.total_without_vat = this.total_price - this.total_vat;

    console.log(this.hotel);
  }

  getRoomsNumbers() {
    let number = 0;
    this.rooms.forEach((x: any) => {
      number = number + x.Quantity;
    });
    return number;
  }
  ngOnDestroy() {
    this.storageService.clearReservationData();
  }
}

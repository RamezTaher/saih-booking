import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { Location } from '@angular/common';
import { BasePostPatchDeleteService, StorageService } from 'sharedServices';
import { BaseGetService } from 'sharedServices';
import { Endpoints } from 'sharedConstants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  transportPricingId?: string;
  transportReservationDate?: string;

  isRtl: boolean = true;

  customerForm = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.email, Validators.required]),
    Phone: new FormControl('', Validators.required),
    Time: new FormControl('', Validators.required),
    PassengersNumber: new FormControl('', Validators.required),
    Notes: new FormControl(''),
  });

  transportReservation = {};
  transportPricing: any;

  bankForm = new FormGroup({
    bank: new FormControl('', Validators.required),
  });

  isBookSuccess = false;

  transportationService: BaseGetService;
  bankService: BaseGetService;

  paymentState: 'CUSTOMER_INFORMATION' | 'BANK_INFORMATION' | 'BOOK_RESULT';

  constructor(
    private router: Router,
    private serializer: UrlSerializer,
    public httpClient: HttpClient,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private transportBookingService: BasePostPatchDeleteService
  ) {
    this.transportationService = new BaseGetService(httpClient);
    this.bankService = new BaseGetService(httpClient);
    this.paymentState = 'CUSTOMER_INFORMATION';
  }

  ngOnInit(): void {
    this.transportPricingId = this.route.snapshot.paramMap.get('id')!;

    if (this.route.snapshot.queryParamMap.get('date')) {
      this.transportReservationDate =
        this.route.snapshot.queryParamMap.get('date')!;
    } else {
      this.transportReservationDate = new Date().toJSON();
    }

    this.isRtl = this.storageService.lang === 'ar' ? true : false;

    this.transportationService
      .getNoSubscribe(Endpoints.transportation_pricing_get, {
        transportationPricingId: this.transportPricingId,
      })
      .subscribe((res) => {
        this.transportPricing = res;
      });

    this.bankService.get(Endpoints.banks_accounts_get);
  }

  saveCustomerInformation() {
    if (this.customerForm.valid) {
      this.paymentState = 'BANK_INFORMATION';

      let reservationTime = new Date(this.customerForm.get('Time')!.value);
      this.transportReservationDate = new Date(
        new Date(this.transportReservationDate!).setHours(
          reservationTime.getHours(),
          reservationTime.getMinutes()
        )
      ).toJSON();

      this.transportReservation = {
        firstName: this.customerForm.get('FirstName')!.value,
        lastName: this.customerForm.get('LastName')!.value,
        email: this.customerForm.get('Email')!.value,
        phone: this.customerForm.get('Phone')!.value,
        date: this.transportReservationDate,
        passengersNumber: this.customerForm.get('PassengersNumber')!.value,
        transportationId: this.transportPricingId,
      };
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  book() {
    if (this.bankForm.valid) {
      const url = this.router.createUrlTree(
        [Endpoints.transportation_add_reservation],
        { queryParams: this.transportReservation }
      );
      this.transportBookingService.post(this.serializer.serialize(url));
      this.transportBookingService.state$.subscribe((res) => {
        if (res.success) {
          this.isBookSuccess = true;
        } else {
          this.isBookSuccess = false;
        }

        this.paymentState = 'BOOK_RESULT';
      });
    }
  }
}

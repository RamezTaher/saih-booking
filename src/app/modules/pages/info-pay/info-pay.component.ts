import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from 'sharedServices';
import { BaseGetService } from 'sharedServices';
import { Endpoints } from 'sharedConstants';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-pay',
  templateUrl: './info-pay.component.html',
  styleUrls: ['./info-pay.component.scss'],
})
export class InfoPayComponent implements OnInit {
  rooms: any = [];
  total_price = 0;
  total_vat = 0;
  total_without_vat = 0;
  user_form = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.email, Validators.required]),
    Phone: new FormControl('', Validators.required),
    Notes: new FormControl(''),
  });
  constructor(
    private router: Router,
    private location: Location,
    public httpsService: BaseGetService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.rooms = this.storageService.selectedRooms;
    if (this.storageService.isLogged()) {
      this.user_form.controls['FirstName'].setValue(
        this.storageService.user.FirstName
      );
      this.user_form.controls['LastName'].setValue(
        this.storageService.user.LastName
      );
      this.user_form.controls['Email'].setValue(
        this.storageService.user.UserName
      );
      this.user_form.controls['Phone'].setValue(this.storageService.user.Phone);
    }
    if (!this.rooms) {
      this.router.navigateByUrl('/');
    }
    this.rooms.forEach((x: any) => {
      this.total_price = this.total_price + x.PriceToPay * x.Quantity;
    });
    this.total_vat = this.total_price * 0.15;
    this.total_without_vat = this.total_price - this.total_vat;

    this.httpsService.get(
      Endpoints.hotels_details_get + this.rooms[0].HotelId,
      {}
    );
  }

  payment() {
    this.user_form.markAllAsTouched();
    if (this.user_form.valid) {
      this.storageService.guest = this.user_form.value;
      this.router.navigateByUrl('/paiement');
    }
  }
  goBack() {
    this.location.back();
  }

  getRoomsNumbers() {
    let number = 0;
    this.rooms.forEach((x: any) => {
      number = number + x.Quantity;
    });
    return number;
  }
}

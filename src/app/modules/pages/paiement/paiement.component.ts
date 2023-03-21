import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {StorageService} from 'sharedServices';
import {BaseGetService} from 'sharedServices';
import {BasePostPatchDeleteService} from 'sharedServices';
import {Endpoints} from 'sharedConstants';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss'],
})
export class PaiementComponent implements OnInit, OnDestroy {
  show: boolean = false;
  payment_method = 'transfer';
  rooms : any = [];
  total_price = 0;
  total_vat = 0;
  total_without_vat = 0;
  submitted = false;
  bank_form = new FormGroup({
    bank: new FormControl('', Validators.required),
  });
  constructor(private router: Router,
    private location: Location,
    public httpsService : BaseGetService,
    public bookingService : BasePostPatchDeleteService,
    private storageService: StorageService) { }

    ngOnInit(): void {

      this.rooms = this.storageService.selectedRooms;
      if(!this.rooms){
        this.router.navigateByUrl('/');
      }
      this.rooms.forEach((x:any)=>{
        this.total_price = this.total_price + x.PriceToPay * x.Quantity;
      });
      this.total_vat = this.total_price * 0.15;
      this.total_without_vat = this.total_price - this.total_vat;

      this.httpsService.get(Endpoints.banks_accounts_get);
      this.bookingService.state$.subscribe(x=>{
        if(x.success){
          this.router.navigateByUrl('/booking-success?url='+encodeURIComponent(x.data?.shareUrlBooking));
          //this.show = true;
          this.storageService.lastBooking = x.data.booking;
        };
      })
    }

    confirm(){
      this.submitted = true;
      this.bank_form.markAllAsTouched();
      if(this.bank_form.valid){
        this.book();
      }
    }

    goBack(){
      this.location.back();
    }

    getRoomsNumbers(){
      let number = 0;
      this.rooms.forEach((x:any)=>{
        number = number + x.Quantity;
      });
      return number;
    }

    book(){
      let booking = {
        HotelId: this.rooms[0].HotelId,
        Bookings: this.rooms,
        User: this.storageService.guest
      };
      booking.User.GuestName = this.storageService.guest.FirstName + ' ' + this.storageService.guest.LastName;
      this.bookingService.post(Endpoints.bookings_multi_rooms_post, booking);
    }

    ngOnDestroy() {
      this.httpsService.destroy();
      this.bookingService.destroy();
    }

  }

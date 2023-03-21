import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoints } from 'sharedConstants';
import { BaseGetService } from 'sharedServices';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  public bookingService: BaseGetService;
  currentPage = 1;
  constructor(httpClient: HttpClient, private router: Router) {
    this.bookingService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    // this.bookingService.get(Endpoints.reservations_list, { page: 1, take: 10 });
  }

  goToPage($event: any) {
    //   this.bookingService.get(Endpoints., {
    //     page: $event,
    //     take: 10,
    //   });
    //   this.currentPage = $event;
  }

  goToDetails(id: string) {
    // go to details function
  }

  onSearch(data: any) {
    // on search 
  }

  ngOnDestroy() {
    this.bookingService.destroy();
  }
}

import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoints } from '../../shared/constants/endpoints';
import { BaseGetService } from '../../shared/services/api/base/get-service';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-transport-booking',
  templateUrl: './transport-booking.component.html',
  styleUrls: ['./transport-booking.component.scss']
})
export class TransportBookingComponent implements OnInit {

  isDirectionOpen: boolean = false;
  email: string = '';
  code: string = '';
  httpService: BaseGetService;

  constructor(
    public storageService: StorageService,
    private router: Router,
    private datePipe: DatePipe,
    private httpclient: HttpClient
  ) {
    this.httpService = new BaseGetService(httpclient);
  }

  ngOnInit(): void {
    this.httpService.get(Endpoints.available_hotels_get);
  }
  onSubscribeToNewLetter() {
    // subscribe function
  }
  goToSearch(searchObject: any) {
    this.router.navigate(['/transport-booking/search'], { queryParams: searchObject });
  }

  goToDetails(hotel: any) {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const date_from = this.datePipe.transform(now, 'yyyy-MM-dd');
    const date_to = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
    this.router.navigateByUrl(
      '/details/' +
        hotel.Slug +
        '?date_from=' +
        date_from +
        '&date_to=' +
        date_to
    );
  }

  hotelsByCity(city: string): void {}

  ngOnDestroy(): void {
    this.httpService.destroy();
  }

}

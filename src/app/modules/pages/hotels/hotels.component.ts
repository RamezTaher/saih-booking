import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoints } from 'sharedConstants';
import { BaseGetService } from 'sharedServices';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  public hotelsService: BaseGetService;
  currentPage = 1;
  constructor(
    private httpClient: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.hotelsService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.hotelsService.get(Endpoints.hotels_get, {});
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

  getHotels(page: number) {
    this.hotelsService.get(Endpoints.hotels_get, {});
  }

  goToPage($event: any) {
    this.hotelsService.get(Endpoints.hotels_availabilities_get, {
      page: $event,
    });
    this.currentPage = $event;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.hotelsService.destroy();
  }
}

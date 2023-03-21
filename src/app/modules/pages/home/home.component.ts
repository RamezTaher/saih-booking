import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'sharedServices';
import { DatePipe } from '@angular/common';
import { BaseGetService } from 'sharedServices';
import { Endpoints } from 'sharedConstants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
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
    this.router.navigate(['/search'], { queryParams: searchObject });
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

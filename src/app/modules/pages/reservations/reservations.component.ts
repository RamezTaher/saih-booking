import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseGetService, StorageService } from 'sharedServices';
import { Endpoints } from 'sharedConstants';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit, OnDestroy {
  Endpoints = Endpoints;
  currentPage = 1;
  isNext = true;
  constructor(
    public httpService: BaseGetService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.fetch();
  }

  goToPage(event: any) {
    this.currentPage = event;
    this.fetch();
  }

  fetch() {
    this.httpService.get(Endpoints.reservations_get, {
      page: this.currentPage,
      pageSize: 5,
      agencyId: this.storageService.user.AgencyId,
    });
  }

  ngOnDestroy() {
    this.httpService.destroy();
  }
}

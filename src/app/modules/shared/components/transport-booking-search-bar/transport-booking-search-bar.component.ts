import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StorageService, BaseGetService } from 'sharedServices';
import { Endpoints } from '../../constants/endpoints';

@Component({
  selector: 'app-transport-booking-search-bar',
  templateUrl: './transport-booking-search-bar.component.html',
  styleUrls: ['./transport-booking-search-bar.component.scss'],
})
export class TransportBookingSearchBarComponent implements OnInit {
  @Input() queries: any;

  @Output() closeChoiceCard = new EventEmitter<Event>();
  @Output() search = new EventEmitter<any>();

  vehiclesService: BaseGetService;

  isActionsOpen: boolean = false;
  isVehiclesOpen: boolean = false;
  isCategoriesOpen: boolean = false;

  currentAction?: { text: string; value: number };
  currentVehicle?: { text: string; value: number };
  currentCategory?: { text: string; value: number };
  currentDate?: string;

  constructor(
    public storageService: StorageService,
    private datePipe: DatePipe,
    private httpClient: HttpClient
  ) {
    this.vehiclesService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    if (this.queries?.actionId) {
      this.currentAction = this.queries['actionId'];
    }
    if (this.queries?.vehicleId) {
      this.currentVehicle = this.queries['vehicleId'];
    }
    if (this.queries?.categoryId) {
      this.currentCategory = this.queries['categoryId'];
    }
  }

  onClose(event: Event) {
    this.closeChoiceCard.emit(event);
  }
  onSearch() {
    let searchObject: any = {};

    if (this.currentDate) {
      searchObject['date'] = this.currentDate;
    }

    if (this.currentAction?.value) {
      searchObject['actionId'] = this.currentAction.value;
    }

    if (this.currentVehicle?.value) {
      searchObject['vehicleId'] = this.currentVehicle.value;
    }

    if (this.currentCategory?.value) {
      searchObject['categoryId'] = this.currentCategory.value;
    }

    this.search.emit(searchObject);
  }

  changeAction(action: { text: string; value: number }) {
    this.isActionsOpen = false;
    if (action.value) {
      this.currentAction = action;
    }
  }

  changeVehicle(vehicle: { text: string; value: number }) {
    this.isVehiclesOpen = false;
    if (vehicle.value) {
      this.currentVehicle = vehicle;
    }
  }

  changeCategory(category: { text: string; value: number }) {
    this.isCategoriesOpen = false;
    if (category.value) {
      this.currentCategory = category;
    }
  }

  changeDates(data: { date: string }) {
    this.currentDate = this.datePipe.transform(data.date, 'yyyy-MM-dd')!;
  }

  actionToggle() {
    this.isActionsOpen = !this.isActionsOpen;
  }

  vehicleToggle() {
    this.isVehiclesOpen = !this.isVehiclesOpen;
  }

  categoryToggle() {
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }
}

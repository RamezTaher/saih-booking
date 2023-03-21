import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'sharedServices';
import { BaseGetService } from '../../../shared/services/api/base/get-service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../../shared/constants/endpoints';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  isFilterOpen: boolean = false;
  isChoiceOpen: boolean = false;
  isClassOpen: boolean = false;

  desktopFilter: boolean = false;
  deskFilter: string = 'الأقل سعرا';
  transportationService: BaseGetService;
  activeClass: number = 0;

  currentDate?: Date;
  currentVehicleId?: number;
  currentActionId?: number;
  currentCategoryId?: number;

  currentPage = 1;
  items = [
    {
      value: 'الأقل سعرا',
    },
    {
      value: 'الأكثر سعرا',
    },
    {
      value: 'الاعلى تصنيفا',
    },
  ];
  constructor(
    public storageService: StorageService,
    private router: Router,
    public httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this.transportationService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.transportationService.get(
      Endpoints.transportation_pricings_get,
      this.getQueriesObject()
    );
  }

  getQueriesObject(): any {
    const queriesObject: any = {};
    const urlQueries = this.route.snapshot.queryParams;
    if (urlQueries['date']) {
      queriesObject.date = urlQueries['date'];
      this.currentDate = new Date(urlQueries['date']);
    }
    if (urlQueries['vehicleId']) {
      queriesObject.vehicleId = urlQueries['vehicleId'];
      this.currentVehicleId = urlQueries['vehicleId'];
    }
    if (urlQueries['actionId']) {
      queriesObject.actionId = urlQueries['actionId'];
      this.currentActionId = urlQueries['actionId'];
    }
    if (urlQueries['categoryId']) {
      queriesObject.categoryId = urlQueries['categoryId'];
      this.currentCategoryId = urlQueries['categoryId'];
    }

    return queriesObject;
  }

  search(searchObject: any) {
    this.router.navigate(['/transport-booking/search'], {
      queryParams: searchObject,
    });

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/transport-booking/search'], {
        queryParams: searchObject,
      })
    );

    this.isChoiceOpen = false;
  }

  goToPage($event: any) {
    this.transportationService.get(Endpoints.hotels_availabilities_get, {
      page: $event,
      ...this.getQueriesObject(),
    });
    this.currentPage = $event;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.transportationService.destroy();
  }
}

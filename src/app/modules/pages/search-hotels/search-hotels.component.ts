import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'sharedServices';
import { BaseGetService } from '../../shared/services/api/base/get-service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../shared/constants/endpoints';

@Component({
  selector: 'app-search-hotels',
  templateUrl: './search-hotels.component.html',
  styleUrls: ['./search-hotels.component.scss'],
})
export class SearchHotelsComponent implements OnInit, OnDestroy {
  isFilterOpen: boolean = false;
  isChoiceOpen: boolean = false;
  isClassOpen: boolean = false;

  desktopFilter: boolean = false;
  deskFilter: string = 'الأقل سعرا';
  hotelsService: BaseGetService;
  activeClass: number = 0;

  currentCheckIn?: Date;
  currentCheckOut?: Date;

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
    private datePipe: DatePipe,
    public httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this.hotelsService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.hotelsService.get(
      Endpoints.hotels_availabilities_get,
      this.getQueriesObject()
    );
  }

  getQueriesObject(): any {
    const queriesObject: any = {};
    const urlQueries = this.route.snapshot.queryParams;
    if (urlQueries['city']) {
      queriesObject.city = urlQueries['city'];
    }
    if (urlQueries['checkin']) {
      queriesObject.checkin = urlQueries['checkin'];
      this.currentCheckIn = new Date(urlQueries['checkin']);
    }
    if (urlQueries['checkout']) {
      queriesObject.checkout = urlQueries['checkout'];
      this.currentCheckOut = new Date(urlQueries['checkout']);
    }
    if (urlQueries['promocode']) {
      queriesObject.promocode = urlQueries['promocode'];
    }
    return queriesObject;
  }

  search(searchObject: any) {
    this.router.navigate(['/search'], {
      queryParams: searchObject,
    });

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/search?city='+searchObject.city+'&checkin='+searchObject.checkin+'&checkout='+searchObject.checkout));


    this.isChoiceOpen = false;

  }

  goToPage($event: any) {
    this.hotelsService.get(Endpoints.hotels_availabilities_get, {
      page: $event,
      ...this.getQueriesObject(),
    });
    this.currentPage = $event;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.hotelsService.destroy();
  }
}

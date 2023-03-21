import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'sharedServices';
import { Endpoints } from '../../shared/constants/endpoints';
import { BaseGetService } from '../../shared/services/api/base/get-service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  showDesciption: boolean = false;

  showS1: boolean = false;
  showS2: boolean = false;
  showS3: boolean = false;
  id: any;
  hotelId: any;
  queries: any;
  roomsInfoList: any = [];
  hotel: any;
  total = 0;
  rooms: any = [];
  hotel_gps: any;
  public hotelsService: BaseGetService;
  public roomsService: BaseGetService;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private activeRoute: ActivatedRoute,
    private storageService: StorageService,
    public translate: TranslateService
  ) {
    this.hotelsService = new BaseGetService(httpClient);
    this.roomsService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = params['hotelId'];
      this.hotelsService
        .getNoSubscribe(Endpoints.hotels_details_get_by_slug, {
          slug: params['hotelId'],
        })
        .subscribe((x) => {
          this.hotelId = x.Id;
          this.hotel = x;
          this.hotel_gps = JSON.parse(this.hotel.MapInfo);
          this.roomsService.get(Endpoints.hotels_available_rooms_get + x.Id, {
            'data.checkIn': this.queries.checkin,
            'data.checkOut': this.queries.checkout,
            'data.promoCode': this.queries.promocode,
          });

          //load rooms pictures
          this.hotelsService
            .getNoSubscribe(Endpoints.hotels_roominfo_get + this.hotelId)
            .subscribe((x) => {
              this.roomsInfoList = x;
            });
        });

      this.activeRoute.queryParams.subscribe((queries) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.queries = { ...queries };
        if (!this.queries.checkin) {
          this.queries.checkin = this.datePipe.transform(today, 'yyyy-MM-dd');
        }
        if (!this.queries.checkout) {
          this.queries.checkout = this.datePipe.transform(
            tomorrow,
            'yyyy-MM-dd'
          );
        }
      });
    });
    this.roomsService.state$.subscribe((x) => {
      if (!x.empty) {
        this.rooms = x.data;
      }
    });
  }


  updateSearch(searchObject: any): void {
    const params = {
      'data.checkIn': this.datePipe.transform( searchObject.checkin, 'yyyy-MM-dd' ),
      'data.checkOut': this.datePipe.transform( searchObject.checkout, 'yyyy-MM-dd' ),
    };
    this.roomsService.get(
      Endpoints.hotels_available_rooms_get,
      { ...params },
      this.hotelId
    );
  }

  selectRooms() {
    this.total = 0;
    this.rooms.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity) {
          this.total = this.total + room.Quantity * room.PriceToPay;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.hotelsService.destroy();
    this.roomsService.destroy();
  }

  search(queries: any): void {
    const params = {
      'data.checkIn': queries.checkin,
      'data.checkOut': queries.checkout,
      'data.promoCode': queries.promocode,
    };
    this.roomsService.get(
      Endpoints.hotels_available_rooms_get,
      { ...params },
      this.hotelId
    );
  }

  scrollTo(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  getHotelName() {}

  getChosenRooms() {
    let selectedRooms: any = [];
    this.rooms.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity > 0) {
          selectedRooms.push(room);
        }
      });
    });
    return selectedRooms;
  }

  getRoomPicture(id: any) {
    let room = this.roomsInfoList?.filter((a: any) => a.Id === id);
    if (room.length > 0) {
      if (room[0].ImageUrl !== null) {
        return room[0].ImageUrl;
      } else {
        if (this.hotel?.Pictures?.length > 0) {
          return this.hotel?.Pictures[0]?.secure_url;
        }
      }
    }
  }

  reservation() {
    if (this.total > 0) {
      let rooms = this.getChosenRooms();
      this.storageService.selectedRooms = rooms;
      this.storageService.hotel = this.hotel;
      this.router.navigateByUrl('/info-paiement');
    }
  }
}

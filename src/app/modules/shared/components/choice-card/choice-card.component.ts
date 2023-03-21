import { DatePipe } from '@angular/common';
import {
  AfterContentChecked,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'sharedServices';

@Component({
  selector: 'app-choice-card',
  templateUrl: './choice-card.component.html',
  styleUrls: ['./choice-card.component.scss'],
})
export class ChoiceCardComponent implements OnInit {
  @Output() closeChoiceCard = new EventEmitter<Event>();
  @Output() search = new EventEmitter<any>();

  @Input() queries: any;
  isDirectionsOpen: boolean = false;
  isDirectionsAvailable: boolean = true;
  isSearchAvailable: boolean = false;

  directions = [
    { text: 'مكّة المكرمة', value: 1 },
    { text: 'جدّة', value: 2 },
    { text: 'المدينة المنورة', value: 3 },
  ];
  currentDirection?: { text: string; value: number };

  currentCheckIn?: string;
  currentCheckOut?: string;

  currentPromocode = '';

  constructor(
    public storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/home' || event.url === '/') {
          this.isDirectionsAvailable = true;
          this.isSearchAvailable = false;
        } else if (event.url.split('?')[0] === '/search') {
          this.isDirectionsAvailable = true;
          this.isSearchAvailable = true;
        } else {
          this.isDirectionsAvailable = false;
          this.isSearchAvailable = false;
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.queries?.city) {
      this.currentDirection = this.directions.filter(
        (d) => d.value == this.queries.city
      )[0];
    }
  }



  onClose(event: Event) {
    this.closeChoiceCard.emit(event);
  }
  onSearch() {
    let searchObject: any = {};
    if (this.currentDirection?.value) {
      searchObject['city'] = this.currentDirection?.value;
    }
    if (this.currentPromocode) {
      searchObject['promocode'] = this.currentPromocode;
    }

    if (this.currentCheckIn) {
      searchObject['checkin'] = this.currentCheckIn;
    }

    if (this.currentCheckOut) {
      searchObject['checkout'] = this.currentCheckOut;
    }

    this.search.emit(searchObject);
  }

  changeDirection(direction: { text: string; value: number }) {
    this.directionToggle();
    if (direction.value) {
      this.currentDirection = direction;
    }
  }

  changeDates(dates: { checkIn: string; checkOut: string }) {
    this.currentCheckIn = this.datePipe.transform(dates.checkIn, 'yyyy-MM-dd')!;
    this.currentCheckOut = this.datePipe.transform(
      dates.checkOut,
      'yyyy-MM-dd'
    )!;
  }

  directionToggle() {
    this.isDirectionsOpen = !this.isDirectionsOpen;
  }
}

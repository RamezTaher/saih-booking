import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-card-reservation',
  templateUrl: './card-reservation.component.html',
  styleUrls: ['./card-reservation.component.scss'],
})
export class CardReservationComponent implements OnInit {
  displayDetail = false;
  @Input() reservation: any;
  reservationDetails: any;
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}
}

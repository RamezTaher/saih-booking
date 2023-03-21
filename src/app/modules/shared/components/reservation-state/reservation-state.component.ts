import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-state',
  templateUrl: './reservation-state.component.html',
  styleUrls: ['./reservation-state.component.scss'],
})
export class ReservationStateComponent implements OnInit {
  @Input() text = '';
  @Input() type = '';

  constructor() {}

  ngOnInit(): void {}
}

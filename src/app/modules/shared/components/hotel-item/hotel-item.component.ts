import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: any;
  constructor() { }

  ngOnInit(): void {
  }

}

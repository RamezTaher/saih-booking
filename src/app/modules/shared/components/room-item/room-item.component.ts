import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss'],
})
export class RoomItemComponent implements OnInit {
  number: number = 0;
  @Input() room: any;
  @Output() onSelectRoom = new EventEmitter<any>();
  @Input() picture: any;
  constructor() {}

  ngOnInit(): void {}
  inc(choice: any) {
    choice.Quantity = parseInt(choice.Quantity) + 1;
    this.onSelectRoom.emit();
  }

  dec(choice: any) {
    if (!choice.Quantity) {
      choice.Quantity = 0;
    } else {
      choice.Quantity = parseInt(choice.Quantity) - 1;
    }
    this.onSelectRoom.emit();
  }

  selectChoice(choice: any) {
    choice.selected = true;
    choice.Quantity = 1;
    this.onSelectRoom.emit();
  }
}

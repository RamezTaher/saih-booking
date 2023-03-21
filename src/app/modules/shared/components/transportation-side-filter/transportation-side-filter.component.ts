import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-transportation-side-filter',
  templateUrl: './transportation-side-filter.component.html',
  styleUrls: ['./transportation-side-filter.component.scss'],
})
export class TransportationSideFilterComponent implements OnInit {
  @Output() closeFilter = new EventEmitter<Event>();

  activeBox: Array<boolean> = [false, false, false, false, false];

  constructor() {}

  ngOnInit(): void {}

  onClose(event: Event) {
    this.closeFilter.emit(event);
  }
}

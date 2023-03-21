import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bookings-filter',
  templateUrl: './bookings-filter.component.html',
  styleUrls: ['./bookings-filter.component.scss'],
})
export class BookingsFilterComponent implements OnInit {
  isBookDateOpened: boolean = false;
  public searchForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: '',
      date: '',
      status: '0',
    });
  }
  @Output() onSearch = new EventEmitter<any>();
  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false,
    preventChangeToNextMonth: true,
  };

  ngOnInit(): void {}

  search() {
    this.onSearch.emit(this.searchForm.value);
  }
}

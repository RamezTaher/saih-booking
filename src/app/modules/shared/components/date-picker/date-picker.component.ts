import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { StorageService } from '../../services/storage/storage.service';
import { arLocale } from '../../services/date-picker/arLocale';
import { TranslationService } from '../../services/translations/translation.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Output() onChange = new EventEmitter<any>();

  @Input() type: 'normal' | 'range' = 'range';

  @Input() date?: string;
  @Input() checkIn?: string;
  @Input() checkOut?: string;

  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false,
    preventChangeToNextMonth: true,
  };
  today: Date = new Date();
  initDate: Date = new Date();
  secondDate: Date = new Date();
  rangeDate: Date[] = [];

  constructor(
    private localeService: BsLocaleService,
    public storage: StorageService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    defineLocale('ar-tn', arLocale);
    this.initDate.setDate(this.secondDate.getDate() + 1);
    this.secondDate.setDate(this.secondDate.getDate() + 2);

    if(this.type === 'range'){
      if (this.checkIn && this.checkOut) {
        this.rangeDate = [new Date(this.checkIn), new Date(this.checkOut)];
      } else {
        this.rangeDate = [this.initDate, this.secondDate];
      }
    }else {
      if (this.date) {
        this.initDate = new Date(this.date);
      }
    }

    if (this.translationService.getLanguage() === 'ar') {
      this.localeService.use('ar-tn');
    } else {
      this.localeService.use('en');
    }
  }
  onValueChange(data: any) {
    if (this.type === 'range') {
      this.onChange.emit({ checkIn: data[0], checkOut: data[1] });
      this.rangeDate = data;
    } else {
      this.initDate = data;
      this.onChange.emit({ date: data });
    }
  }
}

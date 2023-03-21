import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseGetService } from '../../services/api/base/get-service';
import { Endpoints } from '../../constants/endpoints';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss'],
})
export class DirectionsComponent implements OnInit, OnDestroy {
  @Output() onChange = new EventEmitter<{
    text: string;
    value: number;
  }>();

  @Input() value?: number;

  direction: string | null = '';
  citiesService: BaseGetService;
  directions = [
    { text: 'مكّة المكرمة', value: 1 },
    { text: 'جدّة', value: 2 },
    { text: 'المدينة المنورة', value: 3 },
  ];
  selectedItem = { text: '', value: 0 };
  city: any;
  constructor(
    private httpClient: HttpClient,
    public storageService: StorageService
  ) {
    this.citiesService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    if (this.value) {
      this.selectedItem = this.directions.filter(
        (d) => d.value == this.value
      )[0];
      this.changeDirection(this.selectedItem);
    }
  }

  changeDirection(event: { text: string; value: number }) {
    this.selectedItem = event;
    this.onChange.emit(event);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.citiesService.destroy();
  }
}

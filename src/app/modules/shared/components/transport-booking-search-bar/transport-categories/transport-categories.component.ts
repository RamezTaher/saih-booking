import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseGetService } from '../../../services/api/base/get-service';
import { Endpoints } from '../../../constants/endpoints';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-transport-categories',
  templateUrl: './transport-categories.component.html',
  styleUrls: ['./transport-categories.component.scss'],
})
export class TransportCategoriesComponent implements OnInit, OnDestroy {
  @Output() onChange = new EventEmitter<{
    text: string;
    value: number;
  }>();

  @Input() value?: number;

  direction: string | null = '';
  categoriesService: BaseGetService;
  selectedItem = { Id: 0, Name: '', NameAr: '' };
  city: any;
  constructor(
    private httpClient: HttpClient,
    public storageService: StorageService
  ) {
    this.categoriesService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.categoriesService
      .getNoSubscribe(Endpoints.transportation_categories_get)
      .subscribe((res) => {
        if (this.value) {
          this.selectedItem = res.find(
            (v: { Id: number; Name: string; NameAr: string }) =>
              v.Id == this.value
          );
          this.changeCategory(this.selectedItem);
        }
      });
  }

  changeCategory(event: { Id: number; Name: string; NameAr: string }) {
    this.selectedItem = event;
    const item = {
      text: this.storageService.lang == 'ar' ? event.NameAr : event.Name,
      value: event.Id,
    };
    this.onChange.emit(item);
  }
  ngOnDestroy(): void {
    this.categoriesService.destroy();
  }
}

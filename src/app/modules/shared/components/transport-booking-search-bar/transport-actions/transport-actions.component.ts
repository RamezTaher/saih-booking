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
  selector: 'app-transport-actions',
  templateUrl: './transport-actions.component.html',
  styleUrls: ['./transport-actions.component.scss'],
})
export class TransportActionsComponent implements OnInit, OnDestroy {
  @Output() onChange = new EventEmitter<{
    text: string;
    value: number;
  }>();

  @Input() value?: number;

  direction: string | null = '';
  actionsService: BaseGetService;
  selectedItem = { Id: 0, Name: '', NameAr: '' };
  city: any;
  actions: any[] = [];
  constructor(
    private httpClient: HttpClient,
    public storageService: StorageService
  ) {
    this.actionsService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.actionsService
      .getNoSubscribe(Endpoints.transportation_actions_get)
      .subscribe((res) => {
        if (this.value) {
          this.selectedItem = res.find(
            (v: { Id: number; Name: string; NameAr: string }) =>
              v.Id == this.value
          );
          this.changeAction(this.selectedItem);
        }
      });
  }

  changeAction(event: { Id: number; Name: string; NameAr: string }) {
    this.selectedItem = event;
    const item = {
      text: this.storageService.lang == 'ar' ? event.NameAr : event.Name,
      value: event.Id,
    };
    this.onChange.emit(item);
  }
  ngOnDestroy(): void {
    this.actionsService.destroy();
  }
}

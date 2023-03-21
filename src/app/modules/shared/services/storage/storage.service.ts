import { Injectable } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class StorageService {
  constructor(private storage: LocalStorageService) {}

  @LocalStorage()
  token!: string | null;

  @LocalStorage()
  lang!: 'ar' | 'en';

  @LocalStorage()
  currency!: string;

  @LocalStorage()
  selectedRooms!: any;

  @LocalStorage()
  guest: any;

  @LocalStorage()
  user: any;

  @LocalStorage()
  hotel: any;

  @LocalStorage()
  lastBooking: any;

  isLogged(): boolean {
    return this.token != null && this.token != undefined && this.token != '';
  }

  clearReservationData() {
    this.storage.clear('selectedRooms');
    this.storage.clear('guest');
    this.storage.clear('hotel');
  }

  store(key: string, value: any) {
    this.storage.store(key, value);
  }

  clear() {
    this.storage.clear();
  }
}

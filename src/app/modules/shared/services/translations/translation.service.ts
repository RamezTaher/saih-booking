import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { StorageService } from 'sharedServices';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private direction: string = '';

  constructor(
    private translate: TranslateService,
    private storageService: StorageService
  ) {}

  public getLanguage() {
    return this.translate.currentLang;
  }
  public getDirection() {
    return this.direction;
  }
  public setDirection() {
    this.translate.currentLang === 'ar'
      ? this.switchDirection('rtl')
      : this.switchDirection('ltr');
  }
  public switchDirection(direction: string) {
    return (this.direction = direction);
  }
  public changeLanguage(language: 'ar' | 'en') {
    this.storageService.lang = language;
  }
}

import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { StorageService, TranslationService } from 'sharedServices';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { BaseGetService } from 'sharedServices';
import { Endpoints } from './modules/shared/constants/endpoints';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  httpService: BaseGetService;
  constructor(
    public translate: TranslateService,
    public translationService: TranslationService,
    private storageService: StorageService,
    @Inject(DOCUMENT) private _document: any,
    private titleService: Title,
    private metaService: Meta,
    private httpclient: HttpClient
  ) {
    translate.addLangs(['en', 'ar']);
    this.httpService = new BaseGetService(httpclient);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (!this.storageService.lang) {
      //eception if the navigator lang is not en or ar
      this.storageService.lang = 'ar';
      // this.storageService.lang = navigator.language.split('-')[0];
    }

    this.translate.use(this.storageService.lang);
    this.translationService.setDirection();

    const dir = document.createAttribute('dir');
    dir.value = this.translate.currentLang == 'ar' ? 'rtl' : 'ltr';
    this._document.documentElement.dir = dir.value;

    this.httpService
      .getNoSubscribe(Endpoints.hotels_metadata)
      .subscribe((res) => {
        if (this.translate.currentLang == 'ar') {
          this.titleService.setTitle(res['HomeTitleAr']);
          this.metaService.addTags([
            {
              name: 'keywords',
              content: res['HomeKeywordsAr'],
            },
            {
              name: 'description',
              content: res['HomeDescriptionAr'],
            },
          ]);
        } else {
          this.titleService.setTitle(res['HomeTitle']);
          this.metaService.addTags([
            {
              name: 'keywords',
              content: res['HomeKeywords'],
            },
            {
              name: 'description',
              content: res['HomeDescription'],
            },
          ]);
        }
      });
  }
}

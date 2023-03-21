import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StorageService } from 'sharedServices';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { ApiInterceptor } from './modules/shared/services/api/httpconfig-interceptor/httpconfig.interceptor';
registerLocaleData(localeAr);
import { GoogleMapsModule } from '@angular/google-maps';
import { AuthModule } from './modules/auth/auth.module';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    GoogleMapsModule,
    TimepickerModule.forRoot()
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: getLang() },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    StorageService,
    TranslateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

function getLang() {
  let lang = localStorage.getItem('ngx-webstorage|lang') + '';
  if (!lang || lang == 'null') {
    return 'ar';
  }
  let result = lang.substring(1, lang.length - 1);
  return result;
}

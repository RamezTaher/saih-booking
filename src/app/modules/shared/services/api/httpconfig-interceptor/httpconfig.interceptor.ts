import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from 'sharedServices';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // translator
    if (
      req.url.indexOf('/assets/i18n/') > -1 ||
      req.url.indexOf('/api.hsforms.com/submissions/v3/integration') > -1 ||
      req.url.indexOf('api.ipify.org') > -1
    )
      return next.handle(req);

    let request = req.clone({
      url: environment.BASE_API_URL + req.url
    });

  /*  if (this.storageService.isLogged()) {
      if (this.storageService.token) {
        request = request.clone({
          headers: request.headers.append(
            'Authorization',
            `Bearer ${this.storageService.token}`
          ),
        });
      }
    }*/

    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401 && err.status !== 403) {
              return;
            }
            this.router.navigateByUrl('/auth/signin');
            this.storageService.clear();
          }
        }
      )
    );
  }
}

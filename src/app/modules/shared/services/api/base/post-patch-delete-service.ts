import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BasePostPatchDeleteService extends BaseService {
  private subject = new BehaviorSubject<{
    loading: boolean;
    empty: boolean;
    success: boolean;
    data: any;
    error: any;
  }>({ loading: false, empty: true, data: null, error: null, success: false });
  state$: Observable<{
    loading: boolean;
    empty: boolean;
    success: boolean;
    data: any;
    error: any;
  }> = this.subject.asObservable();

  constructor(private httpClient: HttpClient) {
    super();
  }

  handleError(err: any) {
    this.subject.next({
      ...this.subject.value,
      loading: false,
      error: err,
      success: false,
    });
    return of(null);
  }

  post(
    url: string,
    params = {},
    uuid: string = '',
    parent_uuid: string = '',
    headers = {}
  ) {
    this.subject.next({ ...this.subject.value, loading: true });
    this.httpClient
      .post<any>(this.generateURL(url, uuid, parent_uuid), params, headers)
      .pipe(
        map((result) => result),
        tap((result) => {
          this.subject.next({
            loading: false,
            empty: false,
            data: result,
            error: null,
            success: true,
          });
        }),
        catchError((err) => this.handleError(err)),
        takeUntil(this._destroyed$)
      )
      .subscribe();
  }

  put(url: string, params = {}, uuid: string = '', parent_uuid: string = '') {
    this.subject.next({ ...this.subject.value, loading: true });
    this.httpClient
      .put<any>(this.generateURL(url, uuid, parent_uuid), params)
      .pipe(
        map((result) => result),
        tap((result) => {
          this.subject.next({
            loading: false,
            empty: false,
            data: result,
            error: null,
            success: true,
          });
        }),
        catchError((err) => this.handleError(err)),
        takeUntil(this._destroyed$)
      )
      .subscribe();
  }

  patch(url: string, params = {}, uuid: string = '', parent_uuid: string = '') {
    this.subject.next({ ...this.subject.value, loading: true });
    this.httpClient
      .patch<any>(this.generateURL(url, uuid, parent_uuid), params)
      .pipe(
        map((result) => result),
        tap((result) => {
          this.subject.next({
            loading: false,
            empty: false,
            data: result,
            error: null,
            success: true,
          });
        }),
        catchError((err) => this.handleError(err)),
        takeUntil(this._destroyed$)
      )
      .subscribe();
  }

  delete(
    url: string,
    params = {},
    uuid: string = '',
    parent_uuid: string = ''
  ) {
    this.subject.next({ ...this.subject.value, loading: true });
    this.httpClient
      .delete<any>(this.generateURL(url, uuid, parent_uuid), params)
      .pipe(
        map((result) => result),
        tap((result) => {
          this.subject.next({
            loading: false,
            empty: false,
            data: result,
            error: null,
            success: true,
          });
        }),
        catchError((err) => this.handleError(err)),
        takeUntil(this._destroyed$)
      )
      .subscribe();
  }

  override destroy() {
    this.subject.next({
      loading: false,
      empty: true,
      data: null,
      error: null,
      success: false,
    });
    super.destroy();
  }

  reset() {
    this.subject.next({
      loading: false,
      empty: true,
      data: null,
      error: null,
      success: false,
    });
  }
}

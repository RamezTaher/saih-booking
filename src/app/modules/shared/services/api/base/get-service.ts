import { BaseService } from './base-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, takeUntil, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseGetService extends BaseService {
  private subject = new BehaviorSubject<{
    loading: boolean;
    empty: boolean;
    data: any;
    error: any;
  }>({ loading: false, empty: true, data: [], error: null });
  state$: Observable<{
    loading: boolean;
    empty: boolean;
    data: any;
    error: any;
  }> = this.subject.asObservable();

  constructor(private httpClient: HttpClient) {
    super();
  }

  handleError(err: any) {
    this.subject.next({ ...this.subject.value, loading: false, error: err });
    return of(null);
  }

  get(
    url: string,
    params = {},
    uuid: string = '',
    parent_uuid: string = '',
    headers = {}
  ): void {
    const query_string = this.urlEncodeParams(params);
    this.subject.next({ ...this.subject.value, loading: true });
    this.httpClient
      .get<any>(
        this.generateURL(url, uuid, parent_uuid) + '?' + query_string,
        headers
      )
      .pipe(
        map((result) => result),
        tap((result) =>
          this.subject.next({
            loading: false,
            empty: !result || result.length == 0,
            data: result,
            error: null,
          })
        ),
        catchError((err) => this.handleError(err)),
        takeUntil(this._destroyed$)
      )
      .subscribe();
  }

  getNoSubscribe(
    url: string,
    params = {},
    uuid: string = '',
    parent_uuid: string = '',
    headers = {}
  ) {
    const query_string = this.urlEncodeParams(params);
    this.subject.next({ ...this.subject.value, loading: true });
    return this.httpClient
      .get<any>(
        this.generateURL(url, uuid, parent_uuid) + '?' + query_string,
        headers
      )
      .pipe(
        map((result) => result),
        tap((result) =>
          this.subject.next({
            loading: false,
            empty: !result || result.length == 0,
            data: result,
            error: null,
          })
        ),
        takeUntil(this._destroyed$)
      );
  }

  override destroy(): void {
    this.subject.next({ loading: false, empty: true, data: [], error: null });
    super.destroy();
  }
}

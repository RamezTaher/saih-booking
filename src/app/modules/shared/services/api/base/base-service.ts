import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected _destroyed$ = new Subject<void>();
  protected generateURL(
    url: string,
    uuid: string = '',
    parent_uuid: string = ''
  ) {
    if (parent_uuid) {
      return url + parent_uuid + '/' + uuid;
    } else {
      return url + uuid;
    }
  }

  protected urlEncodeParams(params: any = {}) {
    let str = '';
    for (var key in params) {
      if (str != '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(params[key]);
    }
    return str;
  }

  constructor() {}

  destroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SigninModalService {
  constructor() {}

  private _isOpen: boolean = false;

  public get isOpen() {
    return this._isOpen;
  }
  close() {
    this._isOpen = false;
  }
  open() {
    this._isOpen = true;
  }
}

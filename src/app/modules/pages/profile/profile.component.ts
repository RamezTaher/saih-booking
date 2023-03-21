import { Component, OnInit, OnDestroy } from '@angular/core';
import { Endpoints } from 'sharedConstants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BasePostPatchDeleteService,
  BaseGetService,
  StorageService,
} from 'sharedServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user_form = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl({ value: '', disabled: true }, Validators.required),
    Phone: new FormControl('', Validators.required),
    UserName: new FormControl('', Validators.required),
  });
  constructor(
    public httpService: BaseGetService,
    public putService: BasePostPatchDeleteService,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.httpService.get(Endpoints.account_user_get, {
      username: this.storageService.user.UserName,
    });
    this.httpService.state$.subscribe((x) => {
      if (!x.empty && x.data) {
        this.user_form.controls['FirstName'].setValue(x.data.user.FirstName);
        this.user_form.controls['LastName'].setValue(x.data.user.LastName);
        this.user_form.controls['Email'].setValue(x.data.user.Email);
        this.user_form.controls['Phone'].setValue(x.data.user.Phone);
      }
    });
  }

  save() {
    this.user_form.markAllAsTouched();
    this.user_form.controls['UserName'].setValue(
      this.user_form.controls['Email'].value
    );
    if (this.user_form.valid) {

      this.putService.post(
        Endpoints.account_user_update,
        this.user_form.getRawValue()
      );
    }
  }

  ngOnDestroy() {
    this.httpService.destroy();
    this.putService.destroy();
  }
}

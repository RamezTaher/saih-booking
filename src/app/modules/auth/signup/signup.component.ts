import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endpoints } from '../../shared/constants/endpoints';
import { BasePostPatchDeleteService } from '../../shared/services/api/base/post-patch-delete-service';
import { SigninModalService } from '../../shared/services/form-module/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isPasswordShown: boolean = false;
  submitted = false;

  emailsExists = false;
  phoneExists = false;
  usernameExists = false;

  user_form = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Phone: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.email, Validators.required]),
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    public httpService: BasePostPatchDeleteService,
    public signinService: SigninModalService
  ) {}

  ngOnInit(): void {
    this.httpService.state$.subscribe((x) => {
      if (x.success && x.data.success) {
        this.httpService.reset();
        this.signinService.open();
      } else {
        this.emailsExists = x.data?.emailsExists;
        this.phoneExists = x.data?.phoneExists;
        this.usernameExists = x.data?.usernameExists;
      }
    });
  }

  signup() {
    this.user_form.controls['UserName'].setValue(
      this.user_form.controls['Email'].value
    );
    this.submitted = true;
    if (this.user_form.valid) {
      this.httpService.post(Endpoints.account_register, this.user_form.value);
    }
  }

  ngOnDestroy() {
    this.httpService.destroy();
  }
}

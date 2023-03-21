import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @Output() closeForgot = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}

  onClose(event: Event) {
    this.closeForgot.emit(event);
  }
}

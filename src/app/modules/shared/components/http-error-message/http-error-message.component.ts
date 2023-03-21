import { Observable } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-http-error-message',
  templateUrl: './http-error-message.component.html',
})
export class HttpErrorMessageComponent implements OnInit {

  @Input() errorObject:any;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

    this.errorObject = changes['errorObject'].currentValue;
  }

}

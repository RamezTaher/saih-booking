import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-classificator',
  templateUrl: './classificator.component.html',
  styleUrls: ['./classificator.component.scss'],
})
export class ClassificatorComponent implements OnInit {
  @Output() closeClassificator = new EventEmitter<Event>();

  activeClass: number = 0;
  items = [
    {
      value: 'الأقل سعرا',
    },
    {
      value: 'الأكثر سعرا',
    },
    {
      value: 'الاعلى تصنيفا',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onClose(event: Event) {
    this.closeClassificator.emit(event);
    console.log(this.activeClass);
  }
}

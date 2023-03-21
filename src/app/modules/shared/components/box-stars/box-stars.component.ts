import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-stars',
  templateUrl: './box-stars.component.html',
  styleUrls: ['./box-stars.component.scss'],
})
export class BoxStarsComponent implements OnInit {
  @Input() stars: number = 0;

  constructor() {}

  ngOnInit(): void {}
}

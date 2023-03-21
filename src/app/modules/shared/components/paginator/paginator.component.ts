import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() pageCount: number = 1;
  @Output() searchPage = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.pageCount);
  }
  next() {
    if (this.currentPage === this.currentPage - 3) {
      this.searchPage.emit(this.currentPage);
    } else {
      this.searchPage.emit(this.currentPage + 1);
    }
  }
  previous() {
    this.searchPage.emit(this.currentPage - 1);
  }

  pages(n: number): number[] {
    return [...Array(n).keys()].map((i) => i + 1);
  }

  getPageCount() {
    return Math.round((this.pageCount ?? 1) / 10);
  }
}

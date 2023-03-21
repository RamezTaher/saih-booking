import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent implements OnInit {
  @Input() data: any = {};
  queries: any = {};
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((queries) => {
      this.queries = { ...queries };
    });
  }
  navigateToDetails(): void {
    this.router.navigate(['/details', this.data.Slug], {
      queryParams: { ...this.queries },
    });
  }

  getLowestPrice(rooms : any){
    var prices = rooms.map((x:any)=> { return Number(x.PriceToPay) });
    return  Math.min.apply(Math, prices);
  }

  getNights(rooms : any){
    return rooms[0]?.NbrNights;
  }
}

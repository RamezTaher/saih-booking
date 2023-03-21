import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent implements OnInit {
  @Input() data: any = {};
  queries: any = {};
  isRtl: boolean = true;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isRtl = this.storageService.lang === 'ar';
    this.activeRoute.queryParams.subscribe((queries) => {
      this.queries = { ...queries };
    });
  }
  navigateToDetails(): void {
    this.router.navigate(['/details', this.data.Slug], {
      queryParams: { ...this.queries },
    });
  }

  getNights(rooms: any) {
    return rooms[0]?.NbrNights;
  }
}

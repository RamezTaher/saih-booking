import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Endpoints } from 'sharedConstants';
import { BaseGetService, StorageService } from 'sharedServices';

@Component({
  selector: 'app-pricing-details',
  templateUrl: './pricing-details.component.html',
  styleUrls: ['./pricing-details.component.scss'],
})
export class PricingDetailsComponent implements OnInit {
  transportationService: BaseGetService;

  transportPricingId?: string;
  transportReservationDate?: Date;

  isRtl: boolean = true;

  constructor(
    public storageService: StorageService,
    public httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this.transportationService = new BaseGetService(httpClient);
  }

  ngOnInit(): void {
    this.transportPricingId = this.route.snapshot.paramMap.get('id')!;

    if (this.route.snapshot.queryParamMap.get('date')) {
      this.transportReservationDate = new Date(
        this.route.snapshot.queryParamMap.get('date')!
      );
    } else {
      this.transportReservationDate = new Date();
    }

    this.isRtl = this.storageService.lang === 'ar' ? true : false;

    this.transportationService.get(Endpoints.transportation_pricing_get, {
      transportationPricingId: this.transportPricingId,
    });
  }
}

import { Component, Input } from '@angular/core';
import { CarrierRoute } from '../../models/carrier-route.model';

@Component({
  selector: 'app-detail-route',
  templateUrl: './detail-route.component.html',
})
export class DetailRoute {
  @Input() detailRoute: Partial<CarrierRoute>;
}

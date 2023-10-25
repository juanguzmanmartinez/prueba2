import { Component, Input } from '@angular/core';
import { CarrierRoute } from '../../models/carrier-route.model';

@Component({
  selector: 'app-carrier-route-header',
  templateUrl: './carrier-route-header.component.html',
})
export class CarrierRouteHeaderComponent {
  @Input() detailRoute: Partial<CarrierRoute>;
}

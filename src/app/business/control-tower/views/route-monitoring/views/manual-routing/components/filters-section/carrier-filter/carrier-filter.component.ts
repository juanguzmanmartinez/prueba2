import { Component } from '@angular/core';
import { CarrierDB } from '../../../constants/carrier.constant';

@Component({
  selector: 'app-carrier-filter',
  templateUrl: './carrier-filter.component.html',
})
export class CarrierFilterComponent {
  carriers = CarrierDB;
}

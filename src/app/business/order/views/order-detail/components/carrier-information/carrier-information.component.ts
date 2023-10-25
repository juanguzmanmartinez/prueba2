import { Component, Input } from '@angular/core';
import { CarrierInformationModel } from '../../models/carrier-information.model';

@Component({
  selector: 'app-carrier-information',
  templateUrl: './carrier-information.component.html',
  styleUrls: ['./carrier-information.component.scss']
})
export class CarrierInformationComponent {

  @Input() dataCarrier: CarrierInformationModel;

  constructor() { }

}

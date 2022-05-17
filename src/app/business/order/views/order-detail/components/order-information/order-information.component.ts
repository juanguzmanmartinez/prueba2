import { Component, Input } from '@angular/core';
import { OrderInformationModel } from '../../models/order-information.model';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent {

  @Input() dataOrder: OrderInformationModel;

  constructor() { }

}

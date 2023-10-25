import { Component, Input, OnInit } from '@angular/core';
import { PaymentInformationModel } from '../../models/payment-information.model';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.scss']
})
export class PaymentInformationComponent implements OnInit {

  @Input() dataPayment: PaymentInformationModel;

  constructor() { }

  ngOnInit(): void {
  }

}

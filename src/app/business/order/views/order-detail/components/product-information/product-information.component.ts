import { Component, Input } from '@angular/core';
import { ProductInformationModel } from '../../models/product-information.model';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss'],
})
export class ProductInformationComponent {
  @Input() dataProduct: ProductInformationModel;

  showProducts: boolean;
  showRemovedProducts: boolean;

  constructor() {}

  toggleShowRemovedProducts(): void {
    this.showRemovedProducts = !this.showRemovedProducts;
  }

  toggleShowProducts(): void {
    this.showProducts = !this.showProducts;
  }
}

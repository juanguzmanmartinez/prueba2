import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../../../models/product-information.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: ProductModel;
  @Input() removed: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {

  showRemovedProducts: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowRemovedProducts(): void {
    this.showRemovedProducts = !this.showRemovedProducts;
  }

}

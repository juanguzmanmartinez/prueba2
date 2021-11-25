import { Product, ProductInformation } from '../interfaces/order-detail.interface';

export class ProductInformationModel {
  products: Product[];
  productsRemoved: Product[];
  originalAmount: string;
  editedAmount: string;
  withoutDiscountAmount: string;
  igv: string;
  deliveryAmount: string;
  totalDiscount: string;
  totalAmountCharged: string;

  constructor(data: ProductInformation) {
    this.products = data.products.length ? data.products : [];
    this.productsRemoved = [];
    this.originalAmount = '-';
    this.editedAmount = '-';
    this.withoutDiscountAmount = '-';
    this.igv = '-';
    this.deliveryAmount = data.deliveryAmount ? `S/ ${data.deliveryAmount.toFixed(2)}` : 'S/ 0.00';
    this.totalDiscount = data.totalDiscount ? `S/ -${data.totalDiscount.toFixed(2)}` : 'S/ -0.00';
    this.totalAmountCharged = data.totalImport ? `S/ ${data.totalImport.toFixed(2)}` : 'S/ 0.00';
  }
}

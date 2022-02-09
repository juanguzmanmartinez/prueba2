import { Product, ProductInformation } from '../interfaces/order-detail.interface';

export class ProductInformationModel {
  products: ProductModel[];
  productsRemoved: ProductModel[];
  originalAmount: string;
  editedAmount: string;
  withoutDiscountAmount: string;
  igv: string;
  deliveryAmount: string;
  totalDiscount: string;
  totalAmountCharged: string;

  constructor(data: ProductInformation) {
    this.products = data.products.length ? data.products.map(product => new ProductModel(product)) : [];
    this.productsRemoved = [];
    this.originalAmount = '-';
    this.editedAmount = '-';
    this.withoutDiscountAmount = data.totalImportWithOutDiscount ? `S/ ${data.totalImportWithOutDiscount.toFixed(2)}` : 'S/ 0.00';
    this.igv = '-';
    this.deliveryAmount = data.deliveryAmount ? `S/ ${data.deliveryAmount.toFixed(2)}` : 'S/ 0.00';
    this.totalDiscount = data.totalDiscount ? `S/ -${data.totalDiscount.toFixed(2)}` : 'S/ -0.00';
    this.totalAmountCharged = data.totalImport ? `S/ ${data.totalImport.toFixed(2)}` : 'S/ 0.00';
  }
}

export class ProductModel {
  prescription: boolean;
  shortDescription: string;
  name: string;
  sku: string;
  quantity: string;
  totalPrice: string;

  constructor(data: Product) {
    this.prescription = false;
    this.shortDescription = data.shortDescription ? data.shortDescription : '';
    this.name = data.name ? data.name : '-';
    this.sku = data.sku ? data.sku : '-';
    this.quantity = data.quantity ? data.quantity : '-';
    this.totalPrice = data.totalPrice ? data.totalPrice : '-';
  }
}

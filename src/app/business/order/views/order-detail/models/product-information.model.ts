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
  totalImport: string;
  totalImportTOH: string;

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

  existProductRemoved(): boolean {
    return !!this.productsRemoved.length;
  }

  hasMoreThanOneProductRemoved(): boolean {
    return this.productsRemoved.length !== 1;
  }

  hasMoreThanFourProducts(): boolean {
    return this.products.length > 4;
  }

  visibleProducts(): ProductModel[] {
    return this.hasMoreThanFourProducts() ? this.products.slice(0, 4) : this.products;
  }

  hiddenProducts(): ProductModel[] {
    return this.hasMoreThanFourProducts() ? this.products.slice(4) : [];
  }

  firstProductRemoved(): ProductModel {
    return this.productsRemoved[0];
  }

  hiddenProductsRemoved(): ProductModel[] {
    return this.productsRemoved.slice(1);
  }
}

export class ProductModel {
  prescription: boolean;
  presentationDescription: string;
  name: string;
  sku: string;
  quantity: string;
  totalPrice: string;

  constructor(data: Product) {
    this.prescription = false;
    this.presentationDescription = data.presentationDescription ? data.presentationDescription : '';
    this.name = data.name ? data.name : '-';
    this.sku = data.sku ? data.sku : '-';
    this.quantity = data.quantity ? data.quantity : '-';
    this.totalPrice = data.totalPrice ? Number(data.totalPrice).toFixed(2) : '-';
  }
}

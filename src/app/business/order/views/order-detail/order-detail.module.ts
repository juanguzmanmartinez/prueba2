import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-detail.component';
import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { CommonModule } from '@angular/common';
import { TagModule } from '@atoms/tag/tag.module';
import { BackRouterSimpleModule } from '@molecules/back-router-simple/back-router-simple.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { FlowModule } from '@molecules/flow/flow.module';
import { ClientInformationModule } from './components/client-information/client-information.module';
import { OrderInformationModule } from './components/order-information/order-information.module';
import { PaymentInformationModule } from './components/payment-information/payment-information.module';
import { CarrierInformationModule } from './components/carrier-information/carrier-information.module';
import { ProductInformationModule } from './components/product-information/product-information.module';

@NgModule({
  declarations: [
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    OrderDetailRoutingModule,
    BackRouterSimpleModule,
    TagModule,
    IconsModule,
    FlowModule,
    ClientInformationModule,
    OrderInformationModule,
    PaymentInformationModule,
    CarrierInformationModule,
    ProductInformationModule
  ],
  providers: []
})
export class OrderDetailModule { }

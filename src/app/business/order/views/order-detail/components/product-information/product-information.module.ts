import { NgModule } from '@angular/core';
import { ProductInformationComponent } from './product-information.component';
import { AccordionModule } from '@molecules/accordion/accordion.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { ProductDetailModule } from './components/product-detail/product-detail.module';

@NgModule({
  declarations: [
    ProductInformationComponent
  ],
  imports: [
    AccordionModule,
    IconsModule,
    ProductDetailModule
  ],
  exports: [
    ProductInformationComponent
  ]
})
export class ProductInformationModule { }

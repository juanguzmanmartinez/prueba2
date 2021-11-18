import { NgModule } from '@angular/core';
import { OrderInformationComponent } from './order-information.component';
import { AccordionModule } from '@molecules/accordion/accordion.module';

@NgModule({
  declarations: [
    OrderInformationComponent
  ],
  imports: [
    AccordionModule
  ],
  exports: [
    OrderInformationComponent
  ]
})
export class OrderInformationModule { }

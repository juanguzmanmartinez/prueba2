import { NgModule } from '@angular/core';
import { PaymentInformationComponent } from './payment-information.component';
import { AccordionModule } from '@molecules/accordion/accordion.module';
import { IconsModule } from '@atoms/icons/icons.module';

@NgModule({
  declarations: [
    PaymentInformationComponent
  ],
  imports: [
    AccordionModule,
    IconsModule
  ],
  exports: [
    PaymentInformationComponent
  ]
})
export class PaymentInformationModule { }

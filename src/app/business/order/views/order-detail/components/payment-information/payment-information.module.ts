import { NgModule } from '@angular/core';
import { PaymentInformationComponent } from './payment-information.component';
import { AccordionModule } from '@molecules/accordion/accordion.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PaymentInformationComponent
  ],
  imports: [
    AccordionModule,
    IconsModule,
    CommonModule
  ],
  exports: [
    PaymentInformationComponent
  ]
})
export class PaymentInformationModule { }

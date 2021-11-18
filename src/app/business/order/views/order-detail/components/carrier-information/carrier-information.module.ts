import { NgModule } from '@angular/core';
import { CarrierInformationComponent } from './carrier-information.component';
import { AccordionModule } from '@molecules/accordion/accordion.module';

@NgModule({
  declarations: [
    CarrierInformationComponent
  ],
  imports: [
    AccordionModule
  ],
  exports: [
    CarrierInformationComponent
  ]
})
export class CarrierInformationModule { }

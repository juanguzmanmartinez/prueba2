import { NgModule } from '@angular/core';
import { ClientInformationComponent } from './client-information.component';
import { AccordionModule } from '@molecules/accordion/accordion.module';

@NgModule({
  declarations: [
    ClientInformationComponent
  ],
  imports: [
    AccordionModule
  ],
  exports: [
    ClientInformationComponent
  ]
})
export class ClientInformationModule { }

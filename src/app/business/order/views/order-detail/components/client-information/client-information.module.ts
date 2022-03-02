import { NgModule } from '@angular/core';
import { ClientInformationComponent } from './client-information.component';
import { AccordionModule } from '@molecules/accordion/accordion.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ClientInformationComponent
  ],
    imports: [
        AccordionModule,
        CommonModule
    ],
  exports: [
    ClientInformationComponent
  ]
})
export class ClientInformationModule { }

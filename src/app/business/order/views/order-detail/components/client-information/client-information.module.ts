import { NgModule } from '@angular/core';
import { ClientInformationComponent } from './client-information.component';
import { AccordionModule } from '@molecules/accordion/accordion.module';
import { CommonModule } from '@angular/common';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [
    ClientInformationComponent
  ],
    imports: [
        AccordionModule,
        CommonModule,
        PipesModule
    ],
  exports: [
    ClientInformationComponent
  ]
})
export class ClientInformationModule { }

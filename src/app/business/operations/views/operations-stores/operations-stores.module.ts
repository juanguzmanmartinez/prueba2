import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsStoresRoutingModule } from './operations-stores-routing.module';
import {OperationsStoresComponent} from './operations-stores.component';


@NgModule({
  declarations: [
    OperationsStoresComponent
  ],
  imports: [
    CommonModule,
    OperationsStoresRoutingModule
  ]
})
export class OperationsStoresModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsZonesRoutingModule } from './operations-zones-routing.module';
import {OperationsZonesComponent} from './operations-zones.component';


@NgModule({
  declarations: [
    OperationsZonesComponent
  ],
  imports: [
    CommonModule,
    OperationsZonesRoutingModule
  ]
})
export class OperationsZonesModule { }

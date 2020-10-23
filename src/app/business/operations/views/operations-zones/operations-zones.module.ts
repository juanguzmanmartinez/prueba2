import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsZonesRoutingModule } from './operations-zones-routing.module';
import {OperationsZonesComponent} from './operations-zones.component';
import { BackRouterModule } from '../../../../commons/molecules/back-router/back-router.module';
import { CoreModule } from '../../../../core/core.module';


@NgModule({
  declarations: [
    OperationsZonesComponent
  ],
  imports: [
    CommonModule,
    OperationsZonesRoutingModule,
    BackRouterModule,
    CoreModule
  ]
})
export class OperationsZonesModule { }

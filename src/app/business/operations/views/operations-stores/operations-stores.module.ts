import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsStoresRoutingModule } from './operations-stores-routing.module';
import {OperationsStoresComponent} from './operations-stores.component';
import { BackRouterModule } from '../../../../commons/molecules/back-router/back-router.module';
import { CoreModule } from '../../../../core/core.module';


@NgModule({
  declarations: [
    OperationsStoresComponent
  ],
  imports: [
    CommonModule,
    OperationsStoresRoutingModule,
    BackRouterModule,
    CoreModule
  ]
})
export class OperationsStoresModule { }

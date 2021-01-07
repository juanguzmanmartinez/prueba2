import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsStoresRoutingModule } from './operations-stores-routing.module';
import { OperationsStoresComponent } from './operations-stores.component';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { PagesModule } from '@pages/pages.module';


@NgModule({
  declarations: [
    OperationsStoresComponent
  ],
  imports: [
    CommonModule,
    OperationsStoresRoutingModule,
    BackRouterModule,
    PagesModule,
  ]
})
export class OperationsStoresModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsZonesRoutingModule } from './operations-zones-routing.module';
import { OperationsZonesComponent } from './operations-zones.component';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { PagesModule } from '@pages/pages.module';


@NgModule({
  declarations: [
    OperationsZonesComponent
  ],
  imports: [
    CommonModule,
    OperationsZonesRoutingModule,
    BackRouterModule,
    PagesModule,
  ]
})
export class OperationsZonesModule { }

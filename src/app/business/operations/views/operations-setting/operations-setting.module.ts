import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsSettingRoutingModule } from './operations-setting-routing.module';
import { OperationsSettingComponent } from './operations-setting.component';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { UnderConstructionModule } from '@pages/under-construction/under-construction.module';


@NgModule({
  declarations: [
    OperationsSettingComponent
  ],
  imports: [
    CommonModule,
    OperationsSettingRoutingModule,
    BackRouterModule,
    UnderConstructionModule,
  ]
})
export class OperationsSettingModule { }

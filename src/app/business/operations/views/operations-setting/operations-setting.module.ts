import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsSettingRoutingModule } from './operations-setting-routing.module';
import {OperationsSettingComponent} from './operations-setting.component';
import { BackRouterModule } from '../../../../commons/molecules/back-router/back-router.module';
import { CoreModule } from '../../../../core/core.module';


@NgModule({
  declarations: [
    OperationsSettingComponent
  ],
  imports: [
    CommonModule,
    OperationsSettingRoutingModule,
    BackRouterModule,
    CoreModule
  ]
})
export class OperationsSettingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsSettingRoutingModule } from './operations-setting-routing.module';
import {OperationsSettingComponent} from './operations-setting.component';


@NgModule({
  declarations: [
    OperationsSettingComponent
  ],
  imports: [
    CommonModule,
    OperationsSettingRoutingModule
  ]
})
export class OperationsSettingModule { }

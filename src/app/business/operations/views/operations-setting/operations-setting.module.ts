import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsSettingRoutingModule } from './operations-setting-routing.module';
import { OperationsSettingComponent } from './operations-setting.component';
import { BackRouterModule } from '../../../../core/molecules/back-router/back-router.module';
import { PagesModule } from '../../../../core/pages/pages.module';


@NgModule({
  declarations: [
    OperationsSettingComponent
  ],
  imports: [
    CommonModule,
    OperationsSettingRoutingModule,
    BackRouterModule,
    PagesModule,
  ]
})
export class OperationsSettingModule { }

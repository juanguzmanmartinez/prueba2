import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OperationsSettingComponent} from './operations-setting.component';

const routes: Routes = [
  {path: '', component: OperationsSettingComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsSettingRoutingModule { }

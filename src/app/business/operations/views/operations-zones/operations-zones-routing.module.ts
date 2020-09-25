import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OperationsZonesComponent} from './operations-zones.component';

const routes: Routes = [
  {path: '', component: OperationsZonesComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsZonesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapacityAmPmComponent } from './capacity-am-pm.component';


const routes: Routes = [
  {
    path: '', component: CapacityAmPmComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacityAMPMRoutingModule {
}

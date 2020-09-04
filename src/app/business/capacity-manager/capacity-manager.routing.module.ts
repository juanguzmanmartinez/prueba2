import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { CapacityManagerComponent } from './capacity-manager.component';


const routes: Routes = [
  {
    path: '', component: CapacityManagerComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacityManagerRoutingModule {
}

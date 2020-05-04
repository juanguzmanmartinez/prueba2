import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CapacityEditComponent } from './capacity-edit.component';

const routes: Routes = [
  {path: '', component: CapacityEditComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacityEditRoutingModule {
}

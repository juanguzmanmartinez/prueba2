import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapacityProgrammedComponent } from './capacity-programmed.component';


const routes: Routes = [
  {
    path: '', component: CapacityProgrammedComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacityProgrammedRoutingModule {
}

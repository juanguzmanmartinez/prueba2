import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapacityExpressComponent } from './capacity-express.component';


const routes: Routes = [
  {
    path: '', component: CapacityExpressComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacityExpressRoutingModule {
}

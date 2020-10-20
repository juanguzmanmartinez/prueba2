import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OperationsCapacitiesComponent} from './operations-capacities.component';
import {OperationsCapacityHomeComponent} from './views/operations-capacity-home/operations-capacity-home.component';
import {OperationsCapacityAmPmComponent} from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import {OperationsCapacityScheduledComponent} from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import {OperationsCapacityExpressComponent} from './views/operations-capacity-express/operations-capacity-express.component';
import { OperationsCapacityRetComponent } from './views/operations-capacity-ret/operations-capacity-ret.component';


const routes: Routes = [
  {
    path: '', component: OperationsCapacitiesComponent, children: [
      {path: '', component: OperationsCapacityHomeComponent, pathMatch: 'full'},
      {path: 'am-pm', component: OperationsCapacityAmPmComponent, pathMatch: 'full'},
      {path: 'programado', component: OperationsCapacityScheduledComponent, pathMatch: 'full'},
      {path: 'express', component: OperationsCapacityExpressComponent, pathMatch: 'full'},
      {path: 'retiro-tienda', component: OperationsCapacityRetComponent, pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsCapacitiesRoutingModule {
}

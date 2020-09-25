import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OperationsCapacitiesRoutingModule} from './operations-capacities-routing.module';
import {OperationsCapacitiesComponent} from './operations-capacities.component';
import {OperationsCapacityAmPmComponent} from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import {OperationsCapacityScheduledComponent} from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import {OperationsCapacityExpressComponent} from './views/operations-capacity-express/operations-capacity-express.component';
import {OperationsCapacityHomeComponent} from './views/operations-capacity-home/operations-capacity-home.component';


@NgModule({
  declarations: [
    OperationsCapacitiesComponent,
    OperationsCapacityAmPmComponent,
    OperationsCapacityScheduledComponent,
    OperationsCapacityExpressComponent,
    OperationsCapacityHomeComponent,
  ],
  imports: [
    CommonModule,
    OperationsCapacitiesRoutingModule
  ]
})
export class OperationsCapacitiesModule {
}

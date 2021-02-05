import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsCapacitiesComponent } from './operations-capacities.component';
import { OperationsCapacityHomeComponent } from './views/operations-capacity-home/operations-capacity-home.component';
import { OperationsCapacityAmPmComponent } from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import { OperationsCapacityScheduledComponent } from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import { OperationsCapacityExpressComponent } from './views/operations-capacity-express/operations-capacity-express.component';
import { OperationsCapacityRetComponent } from './views/operations-capacity-ret/operations-capacity-ret.component';
import { OPERATIONS_CAPACITIES_PATH } from '@parameters/router-path.parameter';


const routes: Routes = [
    {
        path: '', component: OperationsCapacitiesComponent, children: [
            {path: '', component: OperationsCapacityHomeComponent, pathMatch: 'full'},
            {
                path: OPERATIONS_CAPACITIES_PATH.amPm.toString(),
                component: OperationsCapacityAmPmComponent,
                pathMatch: 'full'
            },
            {
                path: OPERATIONS_CAPACITIES_PATH.scheduled.toString(),
                component: OperationsCapacityScheduledComponent,
                pathMatch: 'full'
            },
            {
                path: OPERATIONS_CAPACITIES_PATH.express.toString(),
                component: OperationsCapacityExpressComponent,
                pathMatch: 'full'
            },
            {
                path: OPERATIONS_CAPACITIES_PATH.ret.toString(),
                component: OperationsCapacityRetComponent,
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationsCapacitiesRoutingModule {
}

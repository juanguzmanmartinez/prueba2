import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsCapacitiesComponent } from './operations-capacities.component';
import { OperationsCapacityHomeComponent } from './views/operations-capacity-home/operations-capacity-home.component';
import { OperationsCapacityAmPmComponent } from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import { OperationsCapacityScheduledComponent } from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import { OperationsCapacityExpressComponent } from './views/operations-capacity-express/operations-capacity-express.component';
import { OperationsCapacityRetComponent } from './views/operations-capacity-ret/operations-capacity-ret.component';
import { OP_CAPACITIES_PATH } from '@parameters/router/paths/operations-path.parameter';


const routes: Routes = [
    {
        path: '', component: OperationsCapacitiesComponent, children: [
            {path: '', component: OperationsCapacityHomeComponent, pathMatch: 'full'},
            {
                path: OP_CAPACITIES_PATH.capacityAmPm.toString(),
                component: OperationsCapacityAmPmComponent,
                pathMatch: 'full'
            },
            {
                path: OP_CAPACITIES_PATH.capacityScheduled.toString(),
                component: OperationsCapacityScheduledComponent,
                pathMatch: 'full'
            },
            {
                path: OP_CAPACITIES_PATH.capacityExpress.toString(),
                component: OperationsCapacityExpressComponent,
                pathMatch: 'full'
            },
            {
                path: OP_CAPACITIES_PATH.capacityRet.toString(),
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

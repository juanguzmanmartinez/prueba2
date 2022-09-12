import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsCapacitiesComponent } from './operations-capacities.component';
import { OperationsCapacityHomeComponent } from './views/operations-capacity-home/operations-capacity-home.component';
import { OperationsCapacityAmPmComponent } from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import { OperationsCapacityScheduledComponent } from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import { OperationsCapacityExpressComponent } from './views/operations-capacity-express/operations-capacity-express.component';
import { OperationsCapacityRetComponent } from './views/operations-capacity-ret/operations-capacity-ret.component';
import { OP_CAPACITIES_PATH } from '@parameters/router/routing/operations/operations-router.parameter';
import { OperationsCapacityReportComponent } from './views/operations-capacity-report/operations-capacity-report.component';
import { OperationsIntervalExpressComponent } from './views/operations-interval-express/operations-interval-express.component';
import { INTERVAL_CHILDREN_PATH } from '@parameters/router/routing/capacity/capacities-router.parameter';
import { OperationsCapacityIntervalComponent } from './views/operations-capacity-interval/operations-capacity-interval.component';
import { OperationsCapacityIntervalUploadComponent } from './views/operations-capacity-interval-upload/operations-capacity-interval-upload.component';

const routes: Routes = [
  {
    path: '',
    component: OperationsCapacitiesComponent,
    children: [
      {
        path: '',
        component: OperationsCapacityHomeComponent,
        pathMatch: 'full',
      },
      {
        path: OP_CAPACITIES_PATH.capacityAmPm.toString(),
        component: OperationsCapacityAmPmComponent,
        pathMatch: 'full',
      },
      {
        path: OP_CAPACITIES_PATH.capacityScheduled.toString(),
        component: OperationsCapacityScheduledComponent,
        pathMatch: 'full',
      },
      {
        path: OP_CAPACITIES_PATH.capacityExpress.toString(),
        component: OperationsCapacityExpressComponent,
        pathMatch: 'full',
      },
      {
        path: OP_CAPACITIES_PATH.capacityRet.toString(),
        component: OperationsCapacityRetComponent,
        pathMatch: 'full',
      },
      {
        path: OP_CAPACITIES_PATH.capacityReport.toString(),
        component: OperationsCapacityReportComponent,
        pathMatch: 'full',
      },
      {
        path: 'interval-express',
        component: OperationsIntervalExpressComponent,
        pathMatch: 'full',
      },
      {
        path: 'intervaltime',
        component: OperationsCapacityIntervalComponent,
        pathMatch: 'full',
      },
      {
        path: 'intervaltime/upload',
        component: OperationsCapacityIntervalUploadComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsCapacitiesRoutingModule {}

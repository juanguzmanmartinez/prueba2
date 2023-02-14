import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CAPACITIES_CHILDREN_PATH } from '@parameters/router/routing/capacities/capacities-router.parameters';
import { CapacityServiceTypeComponent } from './capacity-service-type.component';
import { CapacityAmPmComponent } from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import { CapacityExpressComponent } from './views/operations-capacity-express/operations-capacity-express.component';
import { CapacityHomeComponent } from './views/operations-capacity-home/operations-capacity-home.component';
import { CapacityReportComponent } from './views/operations-capacity-report/operations-capacity-report.component';
import { CapacityRetComponent } from './views/operations-capacity-ret/operations-capacity-ret.component';
import { CapacityScheduledComponent } from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import { OperationsCapacityUploadComponent } from './views/operations-capacity-upload/operations-capacity-upload.component';
import { OperationsIntervalExpressComponent } from './views/operations-interval-express/operations-interval-express.component';

const routes: Routes = [
  {
    path: '',
    component: CapacityServiceTypeComponent,
    children: [
      {
        path: '',
        component: CapacityHomeComponent,
        pathMatch: 'full',
      },
      {
        path: CAPACITIES_CHILDREN_PATH.capacityAmPm.toString(),
        component: CapacityAmPmComponent,
        pathMatch: 'full',
      },
      {
        path: CAPACITIES_CHILDREN_PATH.capacityScheduled.toString(),
        component: CapacityScheduledComponent,
        pathMatch: 'full',
      },
      {
        path: CAPACITIES_CHILDREN_PATH.capacityExpress.toString(),
        component: CapacityExpressComponent,
        pathMatch: 'full',
      },
      {
        path: CAPACITIES_CHILDREN_PATH.capacityRet.toString(),
        component: CapacityRetComponent,
        pathMatch: 'full',
      },
      {
        path: CAPACITIES_CHILDREN_PATH.capacityReport.toString(),
        component: CapacityReportComponent,
        pathMatch: 'full',
      },
      {
        path: CAPACITIES_CHILDREN_PATH.intervalTime.toString(),
        component: OperationsIntervalExpressComponent,
        pathMatch: 'full',
      },
      {
        path: 'upload',
        component: OperationsCapacityUploadComponent,
        pathMatch: 'full',
      },
      // {
      //   path: 'intervaltime',
      //   component: OperationsCapacityIntervalComponent,
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'intervaltime/upload',
      //   component: OperationsCapacityIntervalUploadComponent,
      //   pathMatch: 'full',
      // },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CapacityServiceTypeRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteMonitoringComponent } from './route-monitoring.component';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';
import { CT_CHILDREN_PATH } from '@parameters/router/routing/control-tower/control-tower-router.parameter';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { ROUTER_PERMISSIONS } from '@parameters/router/router-permissions.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { RouteTrackingComponent } from './views/route-tracking/route-tracking.component';
import { ManualRoutingComponent } from './views/manual-routing/manual-routing.component';
import { AllocationRoutingComponent } from './views/allocation-routing/allocation-routing.component';

const routes: Routes = [
  {
    path: '',
    component: RouteMonitoringComponent,
    children: [
      {
        path: '',
        redirectTo: `/${CT_ROUTER_PATH.ctRouteTracking.valueOf()}`,
        pathMatch: 'full',
      },
      {
        path: CT_CHILDREN_PATH.routeTracking.valueOf(),
        canActivate: [PermissionsGuard],
        data: {
          permissions: ROUTER_PERMISSIONS[ROUTER_PATH.ctRouteTracking.valueOf()],
        },
        component: RouteTrackingComponent,
        pathMatch: 'full',
      },
      {
        path: `${CT_CHILDREN_PATH.allocationRouting.valueOf()}/:${CT_CHILDREN_PATH.idLocal.valueOf()}`,
        canActivate: [PermissionsGuard],
        data: {
          permissions:
            ROUTER_PERMISSIONS[ROUTER_PATH.ctAllocationRouting().valueOf()],
        },
        component: AllocationRoutingComponent,
        pathMatch: 'full',
      },
      {
        path: `${CT_CHILDREN_PATH.manualRouting.valueOf()}/:${CT_CHILDREN_PATH.idLocal.valueOf()}`,
        canActivate: [PermissionsGuard],
        data: {
          permissions:
            ROUTER_PERMISSIONS[ROUTER_PATH.ctManualRouting().valueOf()],
        },
        component: ManualRoutingComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteMonirotingRoutingModule {}

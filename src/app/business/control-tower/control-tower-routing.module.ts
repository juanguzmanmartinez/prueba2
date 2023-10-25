import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { ROUTER_PERMISSIONS } from '@parameters/router/router-permissions.parameter';
import { CT_CHILDREN_PATH } from '@parameters/router/routing/control-tower/control-tower-router.parameter';
import { ControlTowerComponent } from './control-tower.component';

const CT_CONTROL_FLEET: Route = {
  path: CT_CHILDREN_PATH.fleet.valueOf(),
  canLoad: [PermissionsGuard],
  data: {
    permissions: ROUTER_PERMISSIONS[ROUTER_PATH.ctControlFleet.valueOf()],
  },
  loadChildren: () =>
    import('./views/control-fleet/control-fleet.module').then(
      (m) => m.ControlFleetModule
    ),
};
const CT_ROUTE_MONITORING: Route = {
  path: CT_CHILDREN_PATH.routes.valueOf(),
  canLoad: [PermissionsGuard],
  data: {
    permissions: ROUTER_PERMISSIONS[ROUTER_PATH.ctRouteMonitoring.valueOf()],
  },
  loadChildren: () =>
    import('./views/route-monitoring/route-monitoring.module').then(
      (m) => m.RouteMonitoringModule
    ),
};

const routes: Routes = [
  {
    path: '',
    component: ControlTowerComponent,
    children: [
      {
        path: '',
        redirectTo: CT_CHILDREN_PATH.fleet.valueOf(),
        pathMatch: 'full',
      },
      CT_CONTROL_FLEET,
      CT_ROUTE_MONITORING,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlTowerRoutingModule {}

import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { ROUTER_PERMISSIONS } from '@parameters/router/router-permissions.parameter';
import { CAPACITIES_CHILDREN_PATH } from '@parameters/router/routing/capacities/capacities-router.parameters';
import { CapacitiesComponent } from './capacities.component';

const CAPACITY_SERVICE_TYPE: Route = {
  path: CAPACITIES_CHILDREN_PATH.serviceType.valueOf(),
  canLoad: [PermissionsGuard],
  data: {
    permissions:
      ROUTER_PERMISSIONS[ROUTER_PATH.capacitiesServiceType.valueOf()],
  },
  loadChildren: () =>
    import('./views/capacity-service-type/capacity-service-type.module').then(
      (m) => m.CapacityServiceTypeModule
    ),
};

const routes: Routes = [
  {
    path: '',
    component: CapacitiesComponent,
    children: [
      {
        path: '',
        redirectTo: CAPACITIES_CHILDREN_PATH.serviceType.valueOf(),
        pathMatch: 'full',
      },
      CAPACITY_SERVICE_TYPE,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapacitiesRoutingModule {}

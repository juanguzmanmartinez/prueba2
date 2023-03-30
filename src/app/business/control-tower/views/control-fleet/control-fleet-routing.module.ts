import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { ROUTER_PERMISSIONS } from '@parameters/router/router-permissions.parameter';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';
import { CT_CHILDREN_PATH } from '@parameters/router/routing/control-tower/control-tower-router.parameter';
import { ControlFleetComponent } from './control-fleet.component';
import { CarrierRouteComponent } from './views/carrier-route/carrier-route.component';
import { CarrierComponent } from './views/carrier/carrier.component';

const routes: Routes = [
  {
    path: '',
    component: ControlFleetComponent,
    children: [
      {
        path: '',
        redirectTo: `/${CT_ROUTER_PATH.ctCarriers.valueOf()}`,
        pathMatch: 'full',
      },
      {
        path: CT_CHILDREN_PATH.carriers.valueOf(),
        canActivate: [PermissionsGuard],
        data: {
          permissions: ROUTER_PERMISSIONS[ROUTER_PATH.ctCarriers.valueOf()],
        },
        component: CarrierComponent,
        pathMatch: 'full',
      },
      {
        path: `${CT_CHILDREN_PATH.carrierRoute.valueOf()}/:${CT_CHILDREN_PATH.idCarrier.valueOf()}`,
        canActivate: [PermissionsGuard],
        data: {
          permissions:
            ROUTER_PERMISSIONS[ROUTER_PATH.ctCarrierRoute().valueOf()],
        },
        component: CarrierRouteComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlFleetRoutingModule {}

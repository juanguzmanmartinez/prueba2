import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { AccountGuard } from '@guards/account.guard';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { AuthGuard } from '@guards/auth.guard';
import { ROUTER_PERMISSIONS } from '@parameters/router/router-permissions.parameter';
import { ACCOUNT_ROUTER } from '@parameters/router/routing/account/account-router.parameter';
import { ADMINISTRATOR_ROUTER } from '@parameters/router/routing/administrator/administrator-router.parameter';
import { OPERATIONS_ROUTER } from '@parameters/router/routing/operations/operations-router.parameter';
import { CORE_ROUTER } from '@parameters/router/routing/core/core-router.parameter';
import { ORDER_ROUTER } from '@parameters/router/routing/order/order-router.parameter';
import { CAPACITIES_ROUTER } from '@parameters/router/routing/capacities/capacities-router.parameters';

const ACCOUNT: Route = {
  path: ACCOUNT_ROUTER.path.valueOf(),
  canActivate: [AccountGuard],
  loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
};

const HOME: Route = {
  path: CORE_ROUTER.base.path.valueOf(),
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
};

const ADMINISTRATOR: Route = {
  path: ADMINISTRATOR_ROUTER.path.valueOf(),
  canLoad: [PermissionsGuard],
  data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.administrator.valueOf()]},
  loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule)
};

const OPERATIONS: Route = {
  path: OPERATIONS_ROUTER.path.valueOf(),
  canLoad: [PermissionsGuard],
  data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.operations.valueOf()]},
  loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
};

const ORDER: Route = {
  path: ORDER_ROUTER.path.valueOf(),
  canLoad: [PermissionsGuard],
  data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.order.valueOf()]},
  loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
};

const CAPACITIES: Route = {
  path: CAPACITIES_ROUTER.path.valueOf(),
  canLoad: [PermissionsGuard],
  data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.capacities.valueOf()]},
  loadChildren: () => import('./capacities/capacities.module').then(m => m.CapacitiesModule)
};

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: BusinessComponent,
    children: [
      HOME,
      OPERATIONS,
      ADMINISTRATOR,
      CAPACITIES,
      ORDER
    ]
  },
  ACCOUNT,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {
}

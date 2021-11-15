import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { OR_CHILDREN_PATH } from '@parameters/router/routing/order/order-router.parameter';
import { OrderComponent } from './order.component';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { ROUTER_PERMISSIONS } from '@parameters/router/router-permissions.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

const ORDER_RECORDS: Route = {
  path: OR_CHILDREN_PATH.records.valueOf(),
  canLoad: [PermissionsGuard],
  data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.orderRecords.valueOf()]},
  loadChildren: () => import('./views/order-records/order-records.module').then(m => m.OrderRecordsModule)
};

const ORDER_DETAIL: Route = {
  path: `${OR_CHILDREN_PATH.detail.valueOf()}/:${OR_CHILDREN_PATH.orderCode}`,
  canLoad: [PermissionsGuard],
  data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.orderDetail()]},
  loadChildren: () => import('./views/order-detail/order-detail.module').then(m => m.OrderDetailModule)
};

const routes: Routes = [
  {
    path: '', component: OrderComponent, children: [
      {
        path: '',
        redirectTo: OR_CHILDREN_PATH.records.valueOf(),
        pathMatch: 'full'
      },
      ORDER_RECORDS,
      ORDER_DETAIL
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

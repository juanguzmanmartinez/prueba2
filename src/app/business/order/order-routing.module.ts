import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { OR_CHILDREN_PATH } from '@parameters/router/routing/order/order-router.parameter';
import { OrderComponent } from './order.component';

const ORDER_RECORDS: Route = {
  path: OR_CHILDREN_PATH.records.valueOf(),
  // canLoad: [PermissionsGuard],
  // data: {permission: ROUTER_PERMISSIONS[ROUTER_PATH.orderRecords.valueOf()]},
  loadChildren: () => import('./views/order-records/order-records.module').then(m => m.OrderRecordsModule)
};

const routes: Routes = [
  {
    path: '', component: OrderComponent, children: [
      {
        path: '',
        redirectTo: OR_CHILDREN_PATH.records.valueOf(),
        pathMatch: 'full'
      },
      ORDER_RECORDS
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

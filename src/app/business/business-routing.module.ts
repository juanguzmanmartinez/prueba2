import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { BusinessComponent } from './business.component';

const HOME_MODULE_ROUTE: Route = {
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
};

const ADMINISTRATOR_CAPACITY: Route = {
  path: 'operations-administrator',
  loadChildren: () => import('./operations-admin/operations-admin.module').then(m => m.OperationsAdminModule),
};

const CAPACITY_EDIT: Route = {
  path: 'capacity-edit',
  loadChildren: () => import('./capacity-edit/capacity-edit.module').then(m => m.CapacityEditModule),
};

const CAPACITY_MANAGER: Route = {
  path: 'capacity-manager',
  loadChildren: () => import('./capacity-manager/capacity-manager.module').then(m => m.CapacityManagerModule),
};
const CAPACITY_AM_PM: Route = {
  path: 'capacity-am-pm',
  loadChildren: () => import('./capacity-am-pm/capacity-am-pm.module').then(m => m.CapacityAmPmModule),
};

const CAPACITY_EXPRESS: Route = {
  path: 'capacity-express',
  loadChildren: () => import('./capacity-express/capacity-express.module').then(m => m.CapacityExpressModule),
};

const CAPACITY_PROGRAMMED: Route = {
  path: 'capacity-programmed',
  loadChildren: () => import('./capacity-programmed/capacity-programmed.module').then(m => m.CapacityProgrammedModule),
};

const OPERATIONS: Route = {
  path: 'operaciones',
  loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
};

const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      OPERATIONS,
      HOME_MODULE_ROUTE,
      ADMINISTRATOR_CAPACITY,
      CAPACITY_EDIT,
      CAPACITY_MANAGER,
      CAPACITY_AM_PM,
      CAPACITY_EXPRESS,
      CAPACITY_PROGRAMMED
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }

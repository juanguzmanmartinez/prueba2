import {NgModule} from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {BusinessComponent} from './business.component';


const ADMINISTRATOR_CAPACITY: Route = {
  path: 'operations-administrator',
  loadChildren: () => import('./operations-admin/operations-admin.module').then(m => m.OperationsAdminModule),
};

const CAPACITY_EDIT: Route = {
  path: 'capacity-edit',
  loadChildren: () => import('./capacity-edit/capacity-edit.module').then(m => m.CapacityEditModule),
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
      {path: '', redirectTo: '/operaciones', pathMatch: 'full'},
      OPERATIONS,
      ADMINISTRATOR_CAPACITY,
      CAPACITY_EDIT,
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {
}

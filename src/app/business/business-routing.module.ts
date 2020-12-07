import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { BUSINESS_PATH } from '@parameters/router-path.parameter';

const OPERATIONS: Route = {
  path: BUSINESS_PATH.operations,
  loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
};
const LOGIN: Route = {
  path: BUSINESS_PATH.login,
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
};

const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      {path: '', redirectTo: `/${BUSINESS_PATH.login}`, pathMatch: 'full'},
      OPERATIONS,
    ]
  },
  LOGIN
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {
}

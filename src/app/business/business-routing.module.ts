import {NgModule} from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {BusinessComponent} from './business.component';


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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {
}

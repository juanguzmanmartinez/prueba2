import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { OperationsAdminComponent } from './operations-admin.component';

const routes: Routes = [
  {path: '', component: OperationsAdminComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsAdminRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { BusinessComponent } from './business.component';

// const HOME_MODULE_ROUTE: Route = {
//   path: 'home',
//   loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
// };
const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'operations-administrator',
        loadChildren: () => import('./operations-admin/operations-admin.module').then(m => m.OperationsAdminModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }

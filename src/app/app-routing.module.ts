import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { NotSupportedComponent } from '@pages/not-supported/not-supported.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./business/business.module').then(m => m.BusinessModule)
      },
      {
        path: 'sin-soporte',
        component: NotSupportedComponent,
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

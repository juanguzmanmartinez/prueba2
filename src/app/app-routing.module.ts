import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './shared/guards/auth-guard.service';
import {NotSupportedComponent} from './core/not-supported/not-supported.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./business/business.module').then(m => m.BusinessModule),
  },
  {
    path: 'sin-soporte',
    component: NotSupportedComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

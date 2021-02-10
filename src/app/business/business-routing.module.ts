import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { BUSINESS_PATH } from '@parameters/router/router-path.parameter';
import { AuthGuard } from '@guards/auth.guard';
import { AccountGuard } from '@guards/account.guard';
import { ROUTER_ACCESS } from '@parameters/router/router-access.parameter';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';

const OPERATIONS: Route = {
    path: BUSINESS_PATH.operations.valueOf(),
    loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
};
const ACCOUNT: Route = {
    path: BUSINESS_PATH.account.valueOf(),
    canActivate: [AccountGuard],
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
};

const ADMIN: Route = {
    path: BUSINESS_PATH.admin.valueOf(),
    canLoad: [AuthGuard],
    data: {roles: ROUTER_ACCESS[CONCAT_PATH.admin.valueOf()]},
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
};

const routes: Routes = [
    {
        path: '',
        component: BusinessComponent,
        children: [
            {
                path: '',
                redirectTo: BUSINESS_PATH.operations.valueOf(),
                pathMatch: 'full'
            },
            OPERATIONS,
            ADMIN
        ]
    },
    ACCOUNT,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BusinessRoutingModule {
}

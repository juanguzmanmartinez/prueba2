import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { BUSINESS_PATH } from '@parameters/router/routing-module-path.parameter';
import { RoleGuard } from '@guards/role-guard.service';
import { AccountGuard } from '@guards/account.guard';
import { ROUTER_ACCESS } from '@parameters/router/router-access.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { AuthGuard } from '@guards/auth.guard';

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
    canLoad: [RoleGuard],
    data: {roles: ROUTER_ACCESS[ROUTER_PATH.admin.valueOf()]},
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
};

const routes: Routes = [
    {
        path: '',
        canActivate: [RoleGuard, AuthGuard],
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

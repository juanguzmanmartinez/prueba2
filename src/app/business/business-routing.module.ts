import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { ROUTING } from '@parameters/router/routing.parameter';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { AccountGuard } from '@guards/account.guard';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { AuthGuard } from '@guards/auth.guard';
import { PERMISSIONS } from '@parameters/auth/permissions.parameter';

const ACCOUNT: Route = {
    path: ROUTING.account.valueOf(),
    canActivate: [AccountGuard],
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
};

const ADMINISTRATOR: Route = {
    path: ROUTING.administrator.valueOf(),
    canLoad: [PermissionsGuard],
    data: {permissions: PERMISSIONS[ROUTER_PATH.administrator.valueOf()]},
    loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule)
};

const OPERATIONS: Route = {
    path: ROUTING.operations.valueOf(),
    canLoad: [PermissionsGuard],
    data: {permissions: PERMISSIONS[ROUTER_PATH.operations.valueOf()]},
    loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
};

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: BusinessComponent,
        children: [
            {
                path: '',
                redirectTo: ROUTING.operations.valueOf(),
                pathMatch: 'full'
            },
            OPERATIONS,
            ADMINISTRATOR
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

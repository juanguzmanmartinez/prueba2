import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { BUSINESS_PATH } from '@parameters/router-path.parameter';
import { AuthGuard } from '@guards/auth.guard';
import { Role } from '@models/auth/role.model';
import { AccountGuard } from '@guards/account.guard';

const OPERATIONS: Route = {
    path: BUSINESS_PATH.operations.valueOf(),
    loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
};
const ACCOUNT: Route = {
    path: BUSINESS_PATH.login.valueOf(),
    canActivate: [AccountGuard],
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
};

const ADMIN: Route = {
    path: BUSINESS_PATH.admin.valueOf(),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin.valueOf()]},
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
};

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: BusinessComponent,
        children: [
            {
                path: '',
                redirectTo: BUSINESS_PATH.operations.valueOf(),
                pathMatch: 'full'
            },
            OPERATIONS,
        ]
    },
    ACCOUNT,
    ADMIN
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BusinessRoutingModule {
}

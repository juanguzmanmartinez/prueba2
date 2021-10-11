import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { AD_CHILDREN_PATH } from '@parameters/router/routing/administrator/administrator-router.parameter';
import { AdministratorHomeComponent } from './views/administrator-home/administrator-home.component';

const USERS: Route = {
    path: AD_CHILDREN_PATH.users.valueOf(),
    loadChildren: () => import('./views/administrator-users/administrator-users.module').then(m => m.AdministratorUsersModule),
};

const routes: Routes = [
    {
        path: '', component: AdministratorComponent, children: [
            {path: '', component: AdministratorHomeComponent, pathMatch: 'full'},
            USERS
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministratorRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorUsersComponent } from './administrator-users.component';
import { AdministratorUsersHomeComponent } from './views/administrator-users-home/administrator-users-home.component';

const routes: Routes = [
    {
        path: '',
        component: AdministratorUsersComponent,
        children: [
            {
                path: '',
                component: AdministratorUsersHomeComponent,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministratorUsersRoutingModule {
}

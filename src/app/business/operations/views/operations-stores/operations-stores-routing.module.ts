import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsStoresComponent } from './operations-stores.component';
import { OperationsStoresHomeComponent } from './views/operations-stores-home/operations-stores-home.component';
import { OperationsStoresEditionComponent } from './views/operations-stores-edition/operations-stores-edition.component';
import { OperationsStoresEditionHomeComponent } from './views/operations-stores-edition/views/operations-stores-edition-home/operations-stores-edition-home.component';
import { OperationsStoresEditionStoreComponent } from './views/operations-stores-edition/views/operations-stores-edition-store/operations-stores-edition-store.component';
import { OperationsStoresEditionServiceTypeComponent } from './views/operations-stores-edition/views/operations-stores-edition-service-type/operations-stores-edition-service-type.component';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OperationsStoresServiceTypeEditionGuard } from './guards/operations-stores-service-type-edition-guard.service';
import { OP_STORES_PATH } from '@parameters/router/routing/operations-routing.parameter';
import { PERMISSIONS } from '@parameters/auth/permissions.parameter';

const routes: Routes = [
    {
        path: '',
        component: OperationsStoresComponent,
        children: [
            {
                path: '',
                component: OperationsStoresHomeComponent,
                pathMatch: 'full'
            },
            {
                path: `:${OP_STORES_PATH.storeCode.valueOf()}`,
                component: OperationsStoresEditionComponent,
                children: [
                    {
                        path: '',
                        component: OperationsStoresEditionHomeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: OP_STORES_PATH.storeEdition.valueOf(),
                        canActivate: [PermissionsGuard],
                        data: {permissions: PERMISSIONS[ROUTER_PATH.opStores_StoreEdition().valueOf()]},
                        component: OperationsStoresEditionStoreComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `:${OP_STORES_PATH.storeServiceTypeEdition.valueOf()}`,
                        canActivate: [PermissionsGuard, OperationsStoresServiceTypeEditionGuard],
                        data: {permissions: PERMISSIONS[ROUTER_PATH.opStores_StoreServiceTypeEdition().valueOf()]},
                        component: OperationsStoresEditionServiceTypeComponent,
                        pathMatch: 'full'
                    }
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationsStoresRoutingModule {
}

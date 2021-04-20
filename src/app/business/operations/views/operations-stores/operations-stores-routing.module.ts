import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsStoresComponent } from './operations-stores.component';
import { OperationsStoresHomeComponent } from './views/operations-stores-home/operations-stores-home.component';
import { OperationsStoresEditionComponent } from './views/operations-stores-edition/operations-stores-edition.component';
import { OperationsStoresEditionHomeComponent } from './views/operations-stores-edition/views/operations-stores-edition-home/operations-stores-edition-home.component';
import { OperationsStoresEditionStoreComponent } from './views/operations-stores-edition/views/operations-stores-edition-store/operations-stores-edition-store.component';
import { OperationsStoresEditionServiceTypeComponent } from './views/operations-stores-edition/views/operations-stores-edition-service-type/operations-stores-edition-service-type.component';
import { OP_STORES_PATH } from '@parameters/router/routing-module-path.parameter';

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
                path: `:${OP_STORES_PATH.storeId.valueOf()}`,
                component: OperationsStoresEditionComponent,
                children: [
                    {
                        path: '',
                        component: OperationsStoresEditionHomeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: OP_STORES_PATH.storeEdition.valueOf(),
                        component: OperationsStoresEditionStoreComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: OP_STORES_PATH.storeAmPm.valueOf(),
                        component: OperationsStoresEditionServiceTypeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: OP_STORES_PATH.storeScheduled.valueOf(),
                        component: OperationsStoresEditionServiceTypeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: OP_STORES_PATH.storeExpress.valueOf(),
                        component: OperationsStoresEditionServiceTypeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: OP_STORES_PATH.storeRet.valueOf(),
                        component: OperationsStoresEditionServiceTypeComponent,
                        pathMatch: 'full'
                    },
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

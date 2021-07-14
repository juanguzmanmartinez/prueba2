import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsDrugstoresComponent } from './operations-drugstores.component';
import { OperationsDrugstoresHomeComponent } from './views/operations-drugstores-home/operations-drugstores-home.component';
import { OperationsDrugstoresEditionComponent } from './views/operations-drugstores-edition/operations-drugstores-edition.component';
import { OperationsDrugstoresEditionHomeComponent } from './views/operations-drugstores-edition/views/operations-drugstores-edition-home/operations-drugstores-edition-home.component';
import { OperationsDrugstoresEditionDrugstoreComponent } from './views/operations-drugstores-edition/views/operations-drugstores-edition-drugstore/operations-drugstores-edition-drugstore.component';
import { OperationsDrugstoresEditionServiceTypeComponent } from './views/operations-drugstores-edition/views/operations-drugstores-edition-service-type/operations-drugstores-edition-service-type.component';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OperationsDrugstoresServiceTypeEditionGuard } from './guards/operations-drugstores-service-type-edition-guard.service';
import { OP_DRUGSTORES_PATH } from '@parameters/router/routing/operations-routing.parameter';
import { PERMISSIONS } from '@parameters/auth/permissions.parameter';

const routes: Routes = [
    {
        path: '',
        component: OperationsDrugstoresComponent,
        children: [
            {
                path: '',
                component: OperationsDrugstoresHomeComponent,
                pathMatch: 'full'
            },
            {
                path: `:${OP_DRUGSTORES_PATH.drugstoreCode.valueOf()}`,
                component: OperationsDrugstoresEditionComponent,
                children: [
                    {
                        path: '',
                        component: OperationsDrugstoresEditionHomeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: OP_DRUGSTORES_PATH.drugstoreEdition.valueOf(),
                        canActivate: [PermissionsGuard],
                        data: {permissions: PERMISSIONS[ROUTER_PATH.opDrugstores_DrugstoreEdition().valueOf()]},
                        component: OperationsDrugstoresEditionDrugstoreComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `:${OP_DRUGSTORES_PATH.drugstoreServiceTypeEdition.valueOf()}`,
                        canActivate: [PermissionsGuard, OperationsDrugstoresServiceTypeEditionGuard],
                        data: {permissions: PERMISSIONS[ROUTER_PATH.opDrugstores_DrugstoreServiceTypeEdition().valueOf()]},
                        component: OperationsDrugstoresEditionServiceTypeComponent,
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
export class OperationsDrugstoresRoutingModule {
}

import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { OperationsHomeComponent } from './views/operations-home/operations-home.component';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OP_CHILDREN_PATH } from '@parameters/router/routing/operations/operations-router.parameter';
import { ROUTER_PERMISSIONS } from '@parameters/router/router-permissions.parameter';

const STORES: Route = {
    path: OP_CHILDREN_PATH.drugstores.valueOf(),
    canLoad: [PermissionsGuard],
    data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.operationDrugstores.valueOf()]},
    loadChildren: () => import('./views/operations-drugstores/operations-drugstores.module').then(m => m.OperationsDrugstoresModule),
};

const ZONES: Route = {
    path: OP_CHILDREN_PATH.zones.valueOf(),
    canLoad: [PermissionsGuard],
    data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.operationZones.valueOf()]},
    loadChildren: () => import('./views/operations-zones/operations-zones.module').then(m => m.OperationsZonesModule),
};

const CAPACITIES: Route = {
    path: OP_CHILDREN_PATH.capacities.valueOf(),
    canLoad: [PermissionsGuard],
    data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.operationCapacities.valueOf()]},
    loadChildren: () => import('./views/operations-capacities/operations-capacities.module').then(m => m.OperationsCapacitiesModule),
};

const SETTING: Route = {
    path: OP_CHILDREN_PATH.settings.valueOf(),
    canLoad: [PermissionsGuard],
    data: {permissions: ROUTER_PERMISSIONS[ROUTER_PATH.operationSettings.valueOf()]},
    loadChildren: () => import('./views/operations-setting/operations-setting.module').then(m => m.OperationsSettingModule),
};

const routes: Routes = [
    {
        path: '', component: OperationsComponent, children: [
            {path: '', component: OperationsHomeComponent, pathMatch: 'full'},
            STORES,
            ZONES,
            CAPACITIES,
            SETTING,
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationsRoutingModule {
}

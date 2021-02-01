import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { OperationsHomeComponent } from './views/operations-home/operations-home.component';
import { OPERATIONS_PATH } from '@parameters/router-path.parameter';

const STORES: Route = {
    path: OPERATIONS_PATH.stores.valueOf(),
    loadChildren: () => import('./views/operations-stores/operations-stores.module').then(m => m.OperationsStoresModule),
};

const ZONES: Route = {
    path: OPERATIONS_PATH.zones.valueOf(),
    loadChildren: () => import('./views/operations-zones/operations-zones.module').then(m => m.OperationsZonesModule),
};

const CAPACITIES: Route = {
    path: OPERATIONS_PATH.capacities.valueOf(),
    loadChildren: () => import('./views/operations-capacities/operations-capacities.module').then(m => m.OperationsCapacitiesModule),
};

const SETTING: Route = {
    path: OPERATIONS_PATH.settings.valueOf(),
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

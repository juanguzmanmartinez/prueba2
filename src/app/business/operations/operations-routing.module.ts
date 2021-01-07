import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { OperationsHomeComponent } from './views/operations-home/operations-home.component';

const STORES: Route = {
    path: 'locales',
    loadChildren: () => import('./views/operations-stores/operations-stores.module').then(m => m.OperationsStoresModule),
};

const ZONES: Route = {
    path: 'zonas',
    loadChildren: () => import('./views/operations-zones/operations-zones.module').then(m => m.OperationsZonesModule),
};

const CAPACITIES: Route = {
    path: 'capacidades',
    loadChildren: () => import('./views/operations-capacities/operations-capacities.module').then(m => m.OperationsCapacitiesModule),
};

const SETTING: Route = {
    path: 'configuraciones',
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

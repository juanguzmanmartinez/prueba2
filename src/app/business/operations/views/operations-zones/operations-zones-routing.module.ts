import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsZonesComponent } from './operations-zones.component';
import { OperationsZonesHomeComponent } from './views/operations-zones-home/operations-zones-home.component';
import { OP_ZONES_PATH } from '@parameters/router/router-path.parameter';
import { OperationsZonesEditionComponent } from './views/operations-zones-edition/operations-zones-edition.component';
import { OperationsZonesEditionHomeComponent } from './views/operations-zones-edition/views/operations-zones-edition-home/operations-zones-edition-home.component';
import { OperationsZonesEditionZoneComponent } from './views/operations-zones-edition/views/operations-zones-edition-zone/operations-zones-edition-zone.component';
import { OperationsZonesEditionServiceTypeComponent } from './views/operations-zones-edition/views/operations-zones-edition-service-type/operations-zones-edition-service-type.component';

const routes: Routes = [
    {
        path: '',
        component: OperationsZonesComponent,
        children: [
            {
                path: '',
                component: OperationsZonesHomeComponent,
                pathMatch: 'full'
            },
            {
                path: `:${OP_ZONES_PATH.zoneCode.valueOf()}`,
                component: OperationsZonesEditionComponent,
                children: [
                    {
                        path: '',
                        component: OperationsZonesEditionHomeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `${OP_ZONES_PATH.zoneEdition.valueOf()}`,
                        component: OperationsZonesEditionZoneComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `${OP_ZONES_PATH.zoneAmPm.valueOf()}`,
                        component: OperationsZonesEditionServiceTypeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `${OP_ZONES_PATH.zoneScheduled.valueOf()}`,
                        component: OperationsZonesEditionServiceTypeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `${OP_ZONES_PATH.zoneExpress.valueOf()}`,
                        component: OperationsZonesEditionServiceTypeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `${OP_ZONES_PATH.zoneRet.valueOf()}`,
                        component: OperationsZonesEditionServiceTypeComponent,
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
export class OperationsZonesRoutingModule {
}

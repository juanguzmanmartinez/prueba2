import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsZonesComponent } from './operations-zones.component';
import { OperationsZonesHomeComponent } from './views/operations-zones-home/operations-zones-home.component';
import { OperationsZonesEditionComponent } from './views/operations-zones-edition/operations-zones-edition.component';
import { OperationsZonesEditionHomeComponent } from './views/operations-zones-edition/views/operations-zones-edition-home/operations-zones-edition-home.component';
import { OperationsZonesEditionZoneComponent } from './views/operations-zones-edition/views/operations-zones-edition-zone/operations-zones-edition-zone.component';
import { OperationsZonesEditionServiceTypeComponent } from './views/operations-zones-edition/views/operations-zones-edition-service-type/operations-zones-edition-service-type.component';
import { OperationsZonesEditionBackupComponent } from './views/operations-zones-edition/views/operations-zones-edition-backup/operations-zones-edition-backup.component';
import { OperationsZonesEditionBackupServiceTypeComponent } from './views/operations-zones-edition/views/operations-zones-edition-backup-service-type/operations-zones-edition-backup-service-type.component';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { PermissionsGuard } from '@guards/permissions-guard.service';
import { OperationsZoneServiceTypeEditionGuard } from './guards/operations-zone-service-type-edition-guard.service';
import { OP_ZONES_PATH } from '@parameters/router/routing/operations-routing.parameter';
import { PERMISSIONS } from '@parameters/auth/permissions.parameter';

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
                        path: OP_ZONES_PATH.zoneEdition.valueOf(),
                        canActivate: [PermissionsGuard],
                        data: {permissions: PERMISSIONS[ROUTER_PATH.opZones_ZoneEdition().valueOf()]},
                        component: OperationsZonesEditionZoneComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `:${OP_ZONES_PATH.zoneServiceTypeEdition.valueOf()}/:${OP_ZONES_PATH.zoneServiceTypeChannelEdition}`,
                        canActivate: [PermissionsGuard, OperationsZoneServiceTypeEditionGuard],
                        data: {permissions: PERMISSIONS[ROUTER_PATH.opZones_ZoneServiceTypeEdition().valueOf()]},
                        component: OperationsZonesEditionServiceTypeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: OP_ZONES_PATH.zoneBackupEdition.valueOf(),
                        canActivate: [PermissionsGuard],
                        data: {permissions: PERMISSIONS[ROUTER_PATH.opZones_ZoneBackupEdition().valueOf()]},
                        component: OperationsZonesEditionBackupComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `${OP_ZONES_PATH.zoneBackupAmPmEdition.valueOf()}`,
                        canActivate: [PermissionsGuard],
                        data: {permissions: PERMISSIONS[ROUTER_PATH.opZones_ZoneBackupAmPmEdition().valueOf()]},
                        component: OperationsZonesEditionBackupServiceTypeComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: `${OP_ZONES_PATH.zoneBackupScheduledEdition.valueOf()}`,
                        canActivate: [PermissionsGuard],
                        data: {permissions: PERMISSIONS[ROUTER_PATH.opZones_ZoneBackupScheduledEdition().valueOf()]},
                        component: OperationsZonesEditionBackupServiceTypeComponent,
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
export class OperationsZonesRoutingModule {
}

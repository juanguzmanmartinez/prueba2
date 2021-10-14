import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericService } from './generic/generic.service';
import { CalendarClientService } from './capacities/calendar-client.service';
import { StoresClientService } from './stores/stores-client.service';
import { AuthClientService } from '@clients/auth/auth-client.service';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { ZonesClientService } from '@clients/zones/zones-client.service';
import { ResourceClientService } from '@clients/resource/resource-client.service';
import { ReportsClientService } from '@clients/reports/reports-client.service';


@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        GenericService,
        CalendarClientService,
        StoresClientService,
        AuthClientService,
        StorageClientService,
        ZonesClientService,
        ResourceClientService,
        ReportsClientService,
    ]
})
export class ClientsServiceModule {
}

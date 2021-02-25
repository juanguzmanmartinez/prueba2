import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericService } from './generic/generic.service';
import { CalendarClientService } from './capacities/calendar-client.service';
import { LocalClientService } from './capacities/local-client.service';
import { AuthClientService } from '@clients/auth/auth-client.service';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { ZonesClientService } from '@clients/zones/zones-client.service';

const SERVICES = [
    GenericService,
    CalendarClientService,
    LocalClientService,
    AuthClientService,
    StorageClientService,
    ZonesClientService,
];


@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ...SERVICES
    ]
})
export class ClientsServiceModule {
}

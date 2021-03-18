import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericService } from './generic/generic.service';
import { CalendarClientService } from './calendar/calendar-client.service';
import { LocalClientService } from './calendar/local-client.service';
import { AuthClientService } from '@clients/auth/auth-client.service';
import { StorageClientService } from '@clients/storage/storage-client.service';

const SERVICES = [
    GenericService,
    CalendarClientService,
    LocalClientService,
    AuthClientService,
    StorageClientService,
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

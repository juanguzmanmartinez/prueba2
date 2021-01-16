import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericService } from './generic/generic.service';
import { HttpClientModule } from '@angular/common/http';
import { CalendarClientService } from './calendar/calendar-client.service';
import { LocalClientService } from './calendar/local-client.service';
import { ErrorInterceptor } from './generic/error-interceptor.service';

const SERVICES = [
    GenericService,
    CalendarClientService,
    LocalClientService,
    ErrorInterceptor
];


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        ...SERVICES
    ]
})
export class ClientsServiceModule {
}

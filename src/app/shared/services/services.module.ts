import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericService } from '@services/generic/generic.service';
import { HttpClientModule } from '@angular/common/http';
import { CalendarClientService } from '@services/calendar/calendar-client.service';
import { LocalClientService } from '@services/calendar/local-client.service';

const SERVICES = [
    GenericService,
    CalendarClientService,
    LocalClientService,
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
export class ServicesModule {
}

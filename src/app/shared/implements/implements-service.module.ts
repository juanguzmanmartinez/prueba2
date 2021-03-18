import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsServiceModule } from '@clients/clients-service.module';
import { AuthImplementService } from '@implements/auth/auth-implement.service';

const SERVICES = [
    AuthImplementService
];


@NgModule({
    imports: [
        CommonModule,
        ClientsServiceModule,
    ],
    providers: [
        ...SERVICES
    ]
})
export class ImplementsServiceModule {
}

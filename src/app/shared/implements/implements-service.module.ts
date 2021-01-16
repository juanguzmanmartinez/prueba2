import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const SERVICES = [
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
export class ImplementsServiceModule {
}

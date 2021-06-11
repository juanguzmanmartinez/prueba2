import { NgModule } from '@angular/core';
import { RouterHelperService } from '@helpers/router-helper.service';
import { CommonModule } from '@angular/common';

const SERVICES = [
    RouterHelperService
];

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ...SERVICES
    ]
})

export class HelpersModule {
}

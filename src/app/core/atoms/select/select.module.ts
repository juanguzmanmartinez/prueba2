import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';


const COMPONENTS = [
    SelectComponent
];


@NgModule({
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS,
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule,
        IconsModule,
        DirectivesModule,
    ]
})
export class SelectModule {
}

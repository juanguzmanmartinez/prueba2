import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { IconsModule } from '../icons/icons.module';
import { InputNumberComponent } from './input-number/input-number.component';
import { DirectivesModule } from '../../../shared/directives/directives.module';

const COMPONENTS = [
    InputComponent,
    InputSearchComponent,
    InputNumberComponent
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
        FormsModule,
        IconsModule,
        DirectivesModule,
    ]
})
export class InputsModule {
}

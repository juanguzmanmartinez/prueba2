import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTimeComponent } from '@atoms/input-time/input-time.component';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { InputTimePickerElementComponent } from '@atoms/input-time/components/input-time-picker-element/input-time-picker-element.component';
import { InputTimePickerComponent } from '@atoms/input-time/components/input-time-picker/input-time-picker.component';


@NgModule({
    declarations: [
        InputTimeComponent,
        InputTimePickerComponent,
        InputTimePickerElementComponent
    ],
    exports: [
        InputTimeComponent
    ],
    imports: [
        CommonModule,
        InputsModule,
        IconsModule,
    ],
    providers: [
    ]
})
export class InputTimeModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '@atoms/icons/icons.module';


@NgModule({
    declarations: [
        CheckboxComponent
    ],
    exports: [
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IconsModule
    ]
})
export class CheckboxModule {
}

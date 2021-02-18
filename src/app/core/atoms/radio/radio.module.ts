import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        RadioComponent
    ],
    exports: [
        RadioComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class RadioModule {
}

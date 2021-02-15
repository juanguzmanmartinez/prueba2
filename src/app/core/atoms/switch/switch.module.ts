import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SwitchComponent
    ],
    exports: [
        SwitchComponent
    ],
    imports: [
        MatSlideToggleModule,
        CommonModule,
        FormsModule
    ]
})
export class SwitchModule {
}

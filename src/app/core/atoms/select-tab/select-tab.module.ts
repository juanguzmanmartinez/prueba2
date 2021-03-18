import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectTabComponent } from './select-tab.component';
import { RadioModule } from '../radio/radio.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SelectTabComponent
    ],
    exports: [
        SelectTabComponent
    ],
    imports: [
        CommonModule,
        RadioModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class SelectTabModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDatepickerRangeComponent } from './views/input-datepicker-range/input-datepicker-range.component';
import { DatepickerHeaderComponent } from './components/datepicker-header/datepicker-header.component';
import { InputDatepickerComponent } from './views/input-datepicker/input-datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IconsModule } from '../icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        DatepickerHeaderComponent,
        InputDatepickerComponent,
        InputDatepickerRangeComponent,
    ],
    exports: [
        InputDatepickerComponent,
        InputDatepickerRangeComponent,
    ],
    imports: [
        CommonModule,
        MatDatepickerModule,
        IconsModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class InputDatepickerModule {
}

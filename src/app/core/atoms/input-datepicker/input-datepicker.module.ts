import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDatepickerRangeComponent } from './views/input-datepicker-range/input-datepicker-range.component';
import { DatepickerHeaderComponent } from './components/datepicker-header/datepicker-header.component';
import { InputDatepickerComponent } from './views/input-datepicker/input-datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IconsModule } from '../icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter, MY_DATE_FORMATS } from '@atoms/input-datepicker/helpers/custom-date-adapter.helper';


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
        PlatformModule,
        CommonModule,
        MatDatepickerModule,
        IconsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform]},
        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    ]
})
export class InputDatepickerModule {
}

import { NgModule } from '@angular/core';
import { DateFilterComponent } from './date-filter.component';
import { SelectModule } from '@atoms/select/select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDatepickerModule } from '@atoms/input-datepicker/input-datepicker.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DateFilterComponent
  ],
  imports: [
    SelectModule,
    FormsModule,
    InputDatepickerModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DateFilterComponent
  ]
})
export class DateFilterModule { }

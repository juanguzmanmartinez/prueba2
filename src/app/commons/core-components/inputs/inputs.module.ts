import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './input/input.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {InputSearchComponent} from './input-search/input-search.component';
import {IconsModule} from '../icons/icons.module';

const COMPONENTS = [
  InputComponent,
  InputSearchComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    IconsModule,
  ]
})
export class InputsModule {
}

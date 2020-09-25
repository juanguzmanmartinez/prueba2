import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './input/input.component';
import {InputSearchComponent} from './input-search/input-search.component';
import {IconsModule} from '../icons/icons.module';

const COMPONENTS = [
  InputComponent,
  InputSearchComponent,
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
    ReactiveFormsModule,
    IconsModule,
  ]
})
export class InputsModule {
}

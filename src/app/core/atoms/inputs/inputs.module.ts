import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputComponent} from './input/input.component';
import {InputSearchComponent} from './input-search/input-search.component';
import {IconsModule} from '../icons/icons.module';
import {SharedModule} from '../../../shared/shared.module';
import {InputNumberComponent} from './input-number/input-number.component';

const COMPONENTS = [
  InputComponent,
  InputSearchComponent,
  InputNumberComponent
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
    IconsModule,
    SharedModule,
  ]
})
export class InputsModule {
}

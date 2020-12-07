import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxComponent} from './checkbox.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CheckboxComponent
  ],
  exports: [
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CheckboxModule {
}

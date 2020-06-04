import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityEditFormsService } from './capacity-edit-forms';
import { CapacityAllEditFormService } from './capacity-all-edit-form.service';
import { InputNumberCapacityDirective } from './input-number.directive';

const COMPONENTS = [
  InputNumberCapacityDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS,
  ],
  providers: [
    CapacityEditFormsService,
    CapacityAllEditFormService,
  ]
})
export class CapacityEditFormsModule { }

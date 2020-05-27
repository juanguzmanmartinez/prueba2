import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityEditFormsService } from './capacity-edit-forms';
import { CapacityAllEditFormService } from './capacity-all-edit-form.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CapacityEditFormsService,
    CapacityAllEditFormService,
  ]
})
export class CapacityEditFormsModule { }

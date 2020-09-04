import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { InputTextCustomerComponent } from './input-text-customer/input-text-customer.component';
import { ButtonsCustomerComponent } from './buttons-customer/buttons-customer.component';
import { CheckboxInputComponent } from './checkbox-input/checkbox-input.component';
import { InputNumberGenericDirective } from './input-text-customer/input-number.directive';
import { RadioControlComponent } from './radio-control/radio-control.component';

const COMPONENTES = [
  DropdownComponent,
  InputTextCustomerComponent,
  ButtonsCustomerComponent,
  CheckboxInputComponent,
  InputNumberGenericDirective,
  RadioControlComponent,
];

@NgModule({
  declarations: [...COMPONENTES],
  exports: [...COMPONENTES],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreComponentsModule { }

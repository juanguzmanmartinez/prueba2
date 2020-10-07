import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { InputTextCustomerComponent } from './input-text-customer/input-text-customer.component';
import { InputNumberGenericDirective } from './input-text-customer/input-number.directive';
import { RadioControlComponent } from './radio-control/radio-control.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import {MatTooltipModule} from '@angular/material/tooltip';

const COMPONENTES = [
  DropdownComponent,
  InputTextCustomerComponent,
  InputNumberGenericDirective,
  RadioControlComponent,
  TooltipComponent,
];

@NgModule({
  declarations: [...COMPONENTES],
  exports: [...COMPONENTES],
    imports: [
        CommonModule,
        FormsModule,
        MatTooltipModule
    ]
})
export class CoreComponentsModule { }

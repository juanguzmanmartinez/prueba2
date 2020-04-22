import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';

const COMPONENTES = [
  DropdownComponent
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

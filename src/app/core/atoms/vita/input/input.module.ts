import { NgModule } from '@angular/core';
import { InputComponent } from './input.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IconsModule],
  exports: [InputComponent],
})
export class InputVitaModule {}

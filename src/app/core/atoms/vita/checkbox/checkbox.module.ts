import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { IconsModule } from '@atoms/icons/icons.module';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, IconsModule],
  exports: [CheckboxComponent],
})
export class CheckboxVitaModule {}

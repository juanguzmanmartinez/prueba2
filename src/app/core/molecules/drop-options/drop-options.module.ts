import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropOptionsComponent } from './drop-options.component';
import { IconsModule } from '@atoms/icons/icons.module';

@NgModule({
  declarations: [DropOptionsComponent],
  exports: [DropOptionsComponent],
  imports: [CommonModule, IconsModule],
})
export class DropOptionsModule {}

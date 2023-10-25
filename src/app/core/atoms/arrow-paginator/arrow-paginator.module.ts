import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '@atoms/icons/icons.module';
import { ArrowPaginatorComponent } from './arrow-paginator.component';

@NgModule({
  declarations: [ArrowPaginatorComponent],
  exports: [ArrowPaginatorComponent],
  imports: [CommonModule, IconsModule],
})
export class ArrowPaginatorModule {}

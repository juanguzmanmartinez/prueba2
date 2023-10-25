import { NgModule } from '@angular/core';
import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';
import { IconsModule } from '@atoms/icons/icons.module';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, IconsModule],
  exports: [PaginatorComponent],
})
export class PaginatorVitaModule {}

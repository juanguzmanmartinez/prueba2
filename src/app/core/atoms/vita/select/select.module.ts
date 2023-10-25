import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@atoms/icons/icons.module';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { SelectComponent } from './select.component';

const COMPONENTS = [SelectComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, IconsModule, DirectivesModule],
})
export class SelectVitaModule {}

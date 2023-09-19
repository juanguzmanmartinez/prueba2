import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@atoms/icons/icons.module';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { SelectMultipleComponent } from './select-multiple.component';
import { CheckboxVitaModule } from '../checkbox/checkbox.module';
import { SearchPipe } from './pipes/search.pipe';
// import { CheckboxModule } from '@atoms/checkbox/checkbox.module';

const COMPONENTS = [SelectMultipleComponent, SearchPipe];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsModule,
    DirectivesModule,
    CheckboxVitaModule,
  ],
})
export class SelectMultipleVitaModule {}

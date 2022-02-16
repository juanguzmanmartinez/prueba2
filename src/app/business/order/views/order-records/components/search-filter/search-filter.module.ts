import { NgModule } from '@angular/core';
import { SearchFilterComponent } from './search-filter.component';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '@atoms/select/select.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { DirectivesModule } from '../../../../../../shared/directives/directives.module';

@NgModule({
  declarations: [
    SearchFilterComponent
  ],
  imports: [
    InputsModule,
    FormsModule,
    SelectModule,
    IconsModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  exports: [
    SearchFilterComponent
  ]
})
export class SearchFilterModule { }

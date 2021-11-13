import { NgModule } from '@angular/core';
import { SearchFilterComponent } from './search-filter.component';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchFilterComponent
  ],
  imports: [
    InputsModule,
    FormsModule
  ],
  exports: [
    SearchFilterComponent
  ]
})
export class SearchFilterModule { }

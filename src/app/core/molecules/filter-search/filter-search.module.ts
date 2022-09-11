import { NgModule } from '@angular/core';
import { SelectModule } from '@atoms/select/select.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterSearchComponent } from './filter-search.component';

@NgModule({
  declarations: [FilterSearchComponent],
  imports: [SelectModule, TooltipModule, ReactiveFormsModule],
  exports: [FilterSearchComponent],
})
export class FilterSearchModule {}

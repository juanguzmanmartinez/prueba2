import { NgModule } from '@angular/core';
import { StatusFilterComponent } from './status-filter.component';
import { SelectModule } from '@atoms/select/select.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StatusFilterComponent
  ],
  imports: [
    SelectModule,
    TooltipModule,
    ReactiveFormsModule
  ],
  exports: [
    StatusFilterComponent
  ]
})
export class StatusFilterModule { }

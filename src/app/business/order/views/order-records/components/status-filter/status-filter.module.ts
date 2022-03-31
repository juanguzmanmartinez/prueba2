import { NgModule } from '@angular/core';
import { StatusFilterComponent } from './status-filter.component';
import { SelectModule } from '@atoms/select/select.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';

@NgModule({
  declarations: [
    StatusFilterComponent
  ],
  imports: [
    SelectModule,
    TooltipModule
  ],
  exports: [
    StatusFilterComponent
  ]
})
export class StatusFilterModule { }

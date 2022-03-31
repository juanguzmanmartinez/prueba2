import { NgModule } from '@angular/core';
import { LocalFilterComponent } from './local-filter.component';
import { SelectModule } from '@atoms/select/select.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';

@NgModule({
  declarations: [
    LocalFilterComponent
  ],
    imports: [
        SelectModule,
        TooltipModule
    ],
  exports: [
    LocalFilterComponent
  ]
})
export class LocalFilterModule { }

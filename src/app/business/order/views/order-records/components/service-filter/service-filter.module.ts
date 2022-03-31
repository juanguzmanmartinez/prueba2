import { NgModule } from '@angular/core';
import { ServiceFilterComponent } from './service-filter.component';
import { SelectModule } from '@atoms/select/select.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';

@NgModule({
  declarations: [
    ServiceFilterComponent
  ],
    imports: [
        SelectModule,
        TooltipModule
    ],
  exports: [
    ServiceFilterComponent
  ]
})
export class ServiceFilterModule { }

import { NgModule } from '@angular/core';
import { ServiceFilterComponent } from './service-filter.component';
import { SelectModule } from '@atoms/select/select.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ServiceFilterComponent
  ],
    imports: [
        SelectModule,
        TooltipModule,
        ReactiveFormsModule
    ],
  exports: [
    ServiceFilterComponent
  ]
})
export class ServiceFilterModule { }

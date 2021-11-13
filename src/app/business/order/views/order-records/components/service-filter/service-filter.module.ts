import { NgModule } from '@angular/core';
import { ServiceFilterComponent } from './service-filter.component';
import { SelectModule } from '@atoms/select/select.module';

@NgModule({
  declarations: [
    ServiceFilterComponent
  ],
  imports: [
    SelectModule
  ],
  exports: [
    ServiceFilterComponent
  ]
})
export class ServiceFilterModule { }

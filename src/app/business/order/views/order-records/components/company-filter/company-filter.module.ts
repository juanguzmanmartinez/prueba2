import { NgModule } from '@angular/core';
import { CompanyFilterComponent } from './company-filter.component';
import { SelectModule } from '@atoms/select/select.module';

@NgModule({
  declarations: [
    CompanyFilterComponent
  ],
  imports: [
    SelectModule
  ],
  exports: [
    CompanyFilterComponent
  ]
})
export class CompanyFilterModule { }

import { NgModule } from '@angular/core';
import { CompanyFilterComponent } from './company-filter.component';
import { SelectModule } from '@atoms/select/select.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompanyFilterComponent
  ],
  imports: [
    SelectModule,
    ReactiveFormsModule
  ],
  exports: [
    CompanyFilterComponent
  ]
})
export class CompanyFilterModule { }

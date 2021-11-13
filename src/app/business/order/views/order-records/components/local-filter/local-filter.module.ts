import { NgModule } from '@angular/core';
import { LocalFilterComponent } from './local-filter.component';
import { SelectModule } from '@atoms/select/select.module';

@NgModule({
  declarations: [
    LocalFilterComponent
  ],
  imports: [
    SelectModule
  ],
  exports: [
    LocalFilterComponent
  ]
})
export class LocalFilterModule { }

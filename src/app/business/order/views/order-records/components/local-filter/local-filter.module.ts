import { NgModule } from '@angular/core';
import { LocalFilterComponent } from './local-filter.component';
import { SelectModule } from '@atoms/select/select.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LocalFilterComponent
  ],
    imports: [
        SelectModule,
        TooltipModule,
        ReactiveFormsModule
    ],
  exports: [
    LocalFilterComponent
  ]
})
export class LocalFilterModule { }

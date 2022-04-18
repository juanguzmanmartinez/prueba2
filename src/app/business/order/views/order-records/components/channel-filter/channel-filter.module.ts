import { NgModule } from '@angular/core';
import { ChannelFilterComponent } from './channel-filter.component';
import { SelectModule } from '@atoms/select/select.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChannelFilterComponent
  ],
  imports: [
    SelectModule,
    ReactiveFormsModule
  ],
  exports: [
    ChannelFilterComponent
  ]
})
export class ChannelFilterModule { }

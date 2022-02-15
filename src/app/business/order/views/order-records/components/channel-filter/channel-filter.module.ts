import { NgModule } from '@angular/core';
import { ChannelFilterComponent } from './channel-filter.component';
import { SelectModule } from '@atoms/select/select.module';

@NgModule({
  declarations: [
    ChannelFilterComponent
  ],
  imports: [
    SelectModule
  ],
  exports: [
    ChannelFilterComponent
  ]
})
export class ChannelFilterModule { }

import { NgModule } from '@angular/core';
import { FlowComponent } from '@molecules/flow/flow.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FlowComponent
  ],
  imports: [
    IconsModule,
    TooltipModule,
    CommonModule
  ],
  exports: [
    FlowComponent
  ]
})
export class FlowModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityManagerComponent } from './capacity-manager.component';
import { CapacityManagerRoutingModule } from './capacity-manager.routing.module';



@NgModule({
  declarations: [CapacityManagerComponent],
  imports: [
    CommonModule,
    CapacityManagerRoutingModule
  ]
})
export class CapacityManagerModule { }

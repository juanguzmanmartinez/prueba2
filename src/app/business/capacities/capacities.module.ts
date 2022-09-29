import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CapacitiesRoutingModule } from './capacities-routing.module';
import { CapacitiesComponent } from './capacities.component';

@NgModule({
  declarations: [CapacitiesComponent],
  imports: [CommonModule, CapacitiesRoutingModule],
})
export class CapacitiesModule {}

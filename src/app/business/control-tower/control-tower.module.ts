import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlTowerRoutingModule } from './control-tower-routing.module';
import { ControlTowerComponent } from './control-tower.component';

@NgModule({
  declarations: [ControlTowerComponent],
  imports: [CommonModule, ControlTowerRoutingModule],
})
export class ControlTowerModule {}

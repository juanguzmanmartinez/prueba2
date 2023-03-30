import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HereMapsService } from '@clients/here-maps/here-maps.service';
import { ControlTowerRoutingModule } from './control-tower-routing.module';
import { ControlTowerComponent } from './control-tower.component';

@NgModule({
  declarations: [ControlTowerComponent],
  imports: [CommonModule, ControlTowerRoutingModule],
  providers: [HereMapsService]
})
export class ControlTowerModule {}

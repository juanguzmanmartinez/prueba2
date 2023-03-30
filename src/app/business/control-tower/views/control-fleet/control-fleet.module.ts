import { NgModule } from '@angular/core';
import { ControlFleetRoutingModule } from './control-fleet-routing.module';
import { ControlFleetComponent } from './control-fleet.component';
import { CarrierRouteComponent } from './views/carrier-route/carrier-route.component';
import { CarrierComponent } from './views/carrier/carrier.component';

@NgModule({
  declarations: [
    ControlFleetComponent,
    CarrierComponent,
    CarrierRouteComponent,
  ],
  imports: [ControlFleetRoutingModule],
})
export class ControlFleetModule {}

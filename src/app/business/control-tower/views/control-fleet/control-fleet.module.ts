import { NgModule } from '@angular/core';
import { ControlFleetRoutingModule } from './control-fleet-routing.module';
import { ControlFleetComponent } from './control-fleet.component';
import { CarrierRouteComponent } from './views/carrier-route/carrier-route.component';
import { CarrierComponent } from './views/carrier/carrier.component';
import { BackRouterSimpleModule } from '@molecules/back-router-simple/back-router-simple.module';
import { TableModule } from '@molecules/table/table.module';
import { MatTableModule } from '@angular/material/table';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { TimeLeftDirective } from './views/carrier-route/directives/timeLeft.directive';
import { OrderStatusDirective } from './views/carrier-route/directives/orderStatus.directive';

@NgModule({
  declarations: [
    ControlFleetComponent,
    CarrierComponent,
    CarrierRouteComponent,
    TimeLeftDirective,
    OrderStatusDirective
  ],
  imports: [
    CommonModule,
    ControlFleetRoutingModule,
    BackRouterSimpleModule,
    TableModule,
    MatTableModule,
    ButtonsModule,
    IconsModule,
    DirectivesModule
  ],
})
export class ControlFleetModule {}

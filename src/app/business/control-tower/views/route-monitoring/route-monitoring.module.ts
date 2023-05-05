import { NgModule } from '@angular/core';
import { RouteMonitoringComponent } from './route-monitoring.component';
import { RouteMonirotingRoutingModule } from './route-monitoring-routing.module';
import { AllocationRoutingComponent } from './views/allocation-routing/allocation-routing.component';
import { ManualRoutingComponent } from './views/manual-routing/manual-routing.component';
import { RouteTrackingComponent } from './views/route-tracking/route-tracking.component';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { BackRouterSimpleModule } from '@molecules/back-router-simple/back-router-simple.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { SelectModule } from '@atoms/select/select.module';
import { TableModule } from '@molecules/table/table.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    RouteMonitoringComponent,
    RouteTrackingComponent,
    AllocationRoutingComponent,
    ManualRoutingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouteMonirotingRoutingModule,
    BackRouterModule,
    BackRouterSimpleModule,
    ButtonsModule,
    IconsModule,
    SelectModule,TableModule,DirectivesModule,MatTableModule
  ],
})
export class RouteMonitoringModule {}

import { NgModule } from '@angular/core';
import { RouteMonitoringComponent } from './route-monitoring.component';
import { RouteMonirotingRoutingModule } from './route-monitoring-routing.module';
import { AllocationRoutingComponent } from './views/allocation-routing/allocation-routing.component';
import { ManualRoutingComponent } from './views/manual-routing/manual-routing.component';
import { RouteTrackingComponent } from './views/route-tracking/route-tracking.component';

@NgModule({
  declarations: [
    RouteMonitoringComponent,
    RouteTrackingComponent,
    AllocationRoutingComponent,
    ManualRoutingComponent,
  ],
  imports: [RouteMonirotingRoutingModule],
})
export class RouteMonitoringModule {}

import { NgModule } from '@angular/core';
import { RouteMonitoringComponent } from './route-monitoring.component';
import { RouteMonirotingRoutingModule } from './route-monitoring-routing.module';
import { AllocationRoutingComponent } from './views/allocation-routing/allocation-routing.component';
import { ManualRoutingComponent } from './views/manual-routing/manual-routing.component';
import { RouteTrackingComponent } from './views/route-tracking/route-tracking.component';
import { BackRouterSimpleModule } from '@molecules/back-router-simple/back-router-simple.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { OrderListComponent } from './views/manual-routing/components/orders-section/order-list/order-list.component';
import { OrderItemComponent } from './views/manual-routing/components/orders-section/order-item/order-item.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MapSectionComponent } from './views/manual-routing/components/map-section/map-section.component';
import { CarrierFilterComponent } from './views/manual-routing/components/filters-section/carrier-filter/carrier-filter.component';
import { LocalFilterComponent } from './views/manual-routing/components/filters-section/local-filter/local-filter.component';
import { FilterSectionComponent } from './views/manual-routing/components/filters-section/filter-section.component';
import { SelectVitaModule } from '@atoms/vita/select/select.module';

@NgModule({
  declarations: [
    RouteMonitoringComponent,
    RouteTrackingComponent,
    AllocationRoutingComponent,
    ManualRoutingComponent,
    OrderListComponent,
    OrderItemComponent,
    MapSectionComponent,
    FilterSectionComponent,
    CarrierFilterComponent,
    LocalFilterComponent,
  ],
  imports: [
    CommonModule,
    RouteMonirotingRoutingModule,
    BackRouterSimpleModule,
    IconsModule,
    DragDropModule,
    SelectVitaModule
  ],
})
export class RouteMonitoringModule {}

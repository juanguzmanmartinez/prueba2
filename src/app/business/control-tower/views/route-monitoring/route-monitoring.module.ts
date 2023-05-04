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
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { ButtonVitaModule } from '@atoms/vita/button/button.module';
import { SwitchModule } from '@atoms/switch/switch.module';
import { OrderStore } from './views/manual-routing/store/order.store';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignedRouteDialogService } from './views/manual-routing/components/assigned-route-dialog/assigned-route-dialog.service';
import { AssignedRouteDialogComponent } from './views/manual-routing/components/assigned-route-dialog/assigned-route-dialog.component';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { FilterOrderComponent } from './views/allocation-routing/components/filter-order/filter-order.component';
import { FilterServiceComponent } from './views/allocation-routing/components/filter-order/filter-service/filter-service.component';
import { FilterErrorComponent } from './views/allocation-routing/components/filter-order/filter-error/filter-error.component';
import { TableSectionComponent } from './views/allocation-routing/components/table-section/table-section.component';
import { TabModule } from '@molecules/tab/tab.module';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from '@molecules/table/table.module';
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';
import { SelectMultipleVitaModule } from '@atoms/vita/select-multiple/select-multiple.module';

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
    AssignedRouteDialogComponent,
    FilterOrderComponent,
    FilterErrorComponent,
    FilterServiceComponent,
    TableSectionComponent,
  ],
  providers: [OrderStore, AssignedRouteDialogService],
  imports: [
    CommonModule,
    DialogModule,
    RouteMonirotingRoutingModule,
    BackRouterSimpleModule,
    IconsModule,
    ButtonsModule,
    DragDropModule,
    SelectVitaModule,
    ButtonVitaModule,
    SwitchModule,
    TabModule,
    MatTableModule,
    TableModule,
    CheckboxModule,
    SelectMultipleVitaModule
  ],
})
export class RouteMonitoringModule {}

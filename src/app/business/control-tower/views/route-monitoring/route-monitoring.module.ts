import { NgModule } from '@angular/core';
import { RouteMonitoringComponent } from './route-monitoring.component';
import { RouteMonirotingRoutingModule } from './route-monitoring-routing.module';
import { AllocationRoutingComponent } from './views/allocation-routing/allocation-routing.component';
import { ManualRoutingComponent } from './views/manual-routing/manual-routing.component';
import { RouteTrackingComponent } from './views/route-tracking/route-tracking.component';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { SelectModule } from '@atoms/select/select.module';
import { TableModule } from '@molecules/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'app/shared/directives/directives.module';
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
import { OrderRouteStore } from './views/manual-routing/store/order.store';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignedRouteDialogService } from './views/manual-routing/components/assigned-route-dialog/assigned-route-dialog.service';
import { AssignedRouteDialogComponent } from './views/manual-routing/components/assigned-route-dialog/assigned-route-dialog.component';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { FilterOrderComponent } from './views/allocation-routing/components/filter-order/filter-order.component';
import { TableSectionComponent } from './views/allocation-routing/components/table-section/table-section.component';
import { TabModule } from '@molecules/tab/tab.module';
import { MatTableModule } from '@angular/material/table';
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';
import { SelectMultipleVitaModule } from '@atoms/vita/select-multiple/select-multiple.module';
import { DetailRouteDialogComponent } from './views/route-tracking/components/detail-route-dialog/detail-route-dialog.component';
import { DetailRouteDialogService } from './views/route-tracking/components/detail-route-dialog/detail-route-dialog.service';
import { DetailRouteStateComponent } from './views/route-tracking/components/detail-route-state/detail-route-state.component';
import { DifferenceTimetDirective } from './directives/difference-time.directive';
import { ResumeRouteComponent } from './views/route-tracking/components/resume-route/resume-route.component';
import { LinksModule } from '@atoms/links/links.module';
import { OrderStore } from './store/order.store';
import { SameLocalDialogComponent } from './views/allocation-routing/components/same-local-dialog/same-local-dialog.component';
import { SameLocalDialogService } from './views/allocation-routing/components/same-local-dialog/same-local-dialog.service';
import { OrderCompletedBarComponent } from './views/route-tracking/components/order-completed-bar/order-completed-bar.component';

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
    TableSectionComponent,
    DetailRouteDialogComponent,
    DetailRouteStateComponent,
    ResumeRouteComponent,
    DifferenceTimetDirective,
    SameLocalDialogComponent,
    OrderCompletedBarComponent
  ],
  providers: [
    OrderRouteStore,
    AssignedRouteDialogService,
    DetailRouteDialogService,
    OrderStore,
    SameLocalDialogService
  ],
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
    SelectMultipleVitaModule,
    SelectModule,
    LinksModule,
  ],
})
export class RouteMonitoringModule {}

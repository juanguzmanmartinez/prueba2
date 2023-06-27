import { NgModule } from '@angular/core';
import { ControlFleetRoutingModule } from './control-fleet-routing.module';
import { ControlFleetComponent } from './control-fleet.component';
import { CarrierRouteComponent } from './views/carrier-route/carrier-route.component';
import { CarrierComponent } from './views/carrier/carrier.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { LinksModule } from '@atoms/links/links.module';
import { RadioModule } from '@atoms/radio/radio.module';
import { CardModule } from '@molecules/cards/card.module';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { StepperModule } from '@molecules/stepper/stepper.module';
import { SelectTabModule } from '@atoms/select-tab/select-tab.module';
import { InputDatepickerModule } from '@atoms/input-datepicker/input-datepicker.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { AlertModule } from '@molecules/alert/alert.module';
import { MatTableModule } from '@angular/material/table';
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { MatDialogModule } from '@angular/material/dialog';
import { IconsModule } from '@atoms/icons/icons.module';
import { TabModule } from '@molecules/tab/tab.module';
import { SelectSearchModule } from '@atoms/select-search/select-search.module';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { TableModule } from '@molecules/table/table.module';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { PipesModule } from '@pipes/pipes.module';
import { DropOptionsModule } from '@molecules/drop-options/drop-options.module';
import { CardStepModule } from '@molecules/card-step/card-step.module';
import { SwitchModule } from '@atoms/switch/switch.module';
import { SelectModule } from '@atoms/select/select.module';
import { StepTabsModule } from '@molecules/step-tabs/step-tabs.module';
import { BackRouterSimpleModule } from '@molecules/back-router-simple/back-router-simple.module';
import { FormFieldModule } from '@molecules/form-field/form-field.module';
import { TagModule } from '@atoms/tag/tag.module';
import { SkeletonModule } from '@molecules/skeleton/skeleton.module';
import { FilterSearchModule } from '@molecules/filter-search/filter-search.module';
import { LocalFilterModule } from 'app/business/order/views/order-records/components/local-filter/local-filter.module';
import { PaginatorModule } from '@atoms/paginator/paginator.module';
import { TimeLeftDirective } from './views/carrier-route/directives/timeLeft.directive';
import { OrderStatusDirective } from './views/carrier-route/directives/orderStatus.directive';
import { HereMapsRoutingService } from './views/carrier-route/implements/here-maps-routing.implement.service';
import { CarrierStatusDirective } from './views/carrier/directives/carrierStatus.directive';
import { ButtonVitaModule } from '@atoms/vita/button/button.module';
import { SelectMultipleVitaModule } from '@atoms/vita/select-multiple/select-multiple.module';
import { ControlTowerImplementService } from '../../implements/control-tower.implement.service';

@NgModule({
  declarations: [
    ControlFleetComponent,
    CarrierComponent,
    CarrierRouteComponent,
    TimeLeftDirective,
    OrderStatusDirective,
    CarrierStatusDirective,
  ],
  imports: [
    ControlFleetRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    LinksModule,
    RadioModule,
    CardModule,
    BackRouterModule,
    StepperModule,
    SelectTabModule,
    FormsModule,
    InputDatepickerModule,
    InputsModule,
    ButtonsModule,
    AlertModule,
    MatTableModule,
    CheckboxModule,
    TooltipModule,
    MatDialogModule,
    IconsModule,
    TabModule,
    SelectSearchModule,
    DirectivesModule,
    TableModule,
    DialogModule,
    PipesModule,
    DropOptionsModule,
    CardStepModule,
    SwitchModule,
    SelectModule,
    StepTabsModule,
    BackRouterSimpleModule,
    FormFieldModule,
    TagModule,
    LocalFilterModule,
    FilterSearchModule,
    PaginatorModule,
    SkeletonModule,
    ButtonVitaModule,
    SelectMultipleVitaModule,
  ],
  providers: [HereMapsRoutingService],
})
export class ControlFleetModule {}

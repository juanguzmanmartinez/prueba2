import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { InputDatepickerModule } from '@atoms/input-datepicker/input-datepicker.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { LinksModule } from '@atoms/links/links.module';
import { RadioModule } from '@atoms/radio/radio.module';
import { SelectSearchModule } from '@atoms/select-search/select-search.module';
import { SelectTabModule } from '@atoms/select-tab/select-tab.module';
import { SelectModule } from '@atoms/select/select.module';
import { SwitchModule } from '@atoms/switch/switch.module';
import { TagModule } from '@atoms/tag/tag.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { AlertModule } from '@molecules/alert/alert.module';
import { BackRouterSimpleModule } from '@molecules/back-router-simple/back-router-simple.module';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { CardStepModule } from '@molecules/card-step/card-step.module';
import { CardModule } from '@molecules/cards/card.module';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { DropOptionsModule } from '@molecules/drop-options/drop-options.module';
import { StepTabsModule } from '@molecules/step-tabs/step-tabs.module';
import { StepperModule } from '@molecules/stepper/stepper.module';
import { TabModule } from '@molecules/tab/tab.module';
import { TableModule } from '@molecules/table/table.module';
import { PipesModule } from '@pipes/pipes.module';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { CapacityServiceTypeRoutingModule } from './capacity-service-type-routing.module';
import { CapacityServiceTypeComponent } from './capacity-service-type.component';
import { BaseCapacityEditionExpress } from './components/base-capacity-edition-express/base-capacity-edition-express.component';
import { BaseCapacityEditionTableForm } from './components/base-capacity-edition-table-form/base-capacity-edition-table-form.component';
import { OpCapacitiesDrugstoreDefaultCapacityCardComponent } from './components/op-capacities-drugstore-default-capacity-card/op-capacities-drugstore-default-capacity-card.component';
import { OpCapacitiesDrugstoreDefaultCapacityDialogComponent } from './components/op-capacities-drugstore-default-capacity-dialog/op-capacities-drugstore-default-capacity-dialog.component';
import { OpCapacitiesDrugstoreDefaultCapacityComponent } from './components/op-capacities-drugstore-default-capacity/op-capacities-drugstore-default-capacity.component';
import { OpCapacitiesIntervalStepConfirmationComponent } from './components/op-capacities-interval-step-confirmation/op-capacities-interval-step-confirmation.component';
import { OpCapacitiesIntervalStepUploadComponent } from './components/op-capacities-interval-step-upload/op-capacities-interval-step-upload.component';
import { OpCapacitiesStepCapacityTableFormService } from './components/op-capacities-step-capacity-table-form/form/op-capacities-step-capacity-table-form.service';
import { OpCapacitiesStepCapacityTableFormComponent } from './components/op-capacities-step-capacity-table-form/op-capacities-step-capacity-table-form.component';
import { OpCapacitiesStepCapacityTableComponent } from './components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.component';
import { OpCapacitiesStepCapacityTableService } from './components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.service';
import { OpCapacitiesStepEditionModeComponent } from './components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.component';
import { OpCapacitiesStepEditionModeService } from './components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { OpCapacitiesStepExpressResourceFormService } from './components/op-capacities-step-express-resource/form/op-capacities-step-express-resource-form.service';
import { OpCapacitiesStepExpressResourceComponent } from './components/op-capacities-step-express-resource/op-capacities-step-express-resource.component';
import { OpCapacitiesStepExpressResourceService } from './components/op-capacities-step-express-resource/op-capacities-step-express-resource.service';
import { OpCapacitiesStepGroupOrDrugstoreComponent } from './components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.component';
import { OpCapacitiesStepGroupOrDrugstoreService } from './components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { OpIntervalsStepSetExpressComponent } from './components/op-intervals-step-set-express/op-intervals-step-set-express.component';
import { OperationsCapacitiesImplementService } from './implements/operations-capacities-implement.service';
import { DrugStoreServiceStore } from './store/drug-store.service';
import { IntervalTimeExpressFormService } from './store/interval-time-express-form.service';
import { CapacityAmPmComponent } from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import { OperationsCapacityAmPmService } from './views/operations-capacity-am-pm/operations-capacity-am-pm.service';
import { OperationsCapacityAmPmStoreService } from './views/operations-capacity-am-pm/store/operations-capacity-am-pm-store.service';
import { CapacityExpressComponent } from './views/operations-capacity-express/operations-capacity-express.component';
import { CapacityHomeComponent } from './views/operations-capacity-home/operations-capacity-home.component';
import { OperationsCapacityIntervalUploadComponent } from './views/operations-capacity-interval-upload/operations-capacity-interval-upload.component';
import { OperationsCapacityIntervalComponent } from './views/operations-capacity-interval/operations-capacity-interval.component';
import { CapacityReportComponent } from './views/operations-capacity-report/operations-capacity-report.component';
import { CapacityRetComponent } from './views/operations-capacity-ret/operations-capacity-ret.component';
import { OperationsCapacityRetService } from './views/operations-capacity-ret/operations-capacity-ret.service';
import { OperationsCapacityRetStoreService } from './views/operations-capacity-ret/store/operations-capacity-ret-store.service';
import { CapacityScheduledComponent } from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import { OperationsCapacityScheduledService } from './views/operations-capacity-scheduled/operations-capacity-scheduled.service';
import { OperationsCapacityScheduledStoreService } from './views/operations-capacity-scheduled/store/operations-capacity-scheduled-store.service';
import { OperationsIntervalExpressComponent } from './views/operations-interval-express/operations-interval-express.component';

@NgModule({
  declarations: [
    CapacityServiceTypeComponent,
    CapacityHomeComponent,
    CapacityAmPmComponent,
    CapacityScheduledComponent,
    CapacityExpressComponent,
    CapacityRetComponent,
    CapacityReportComponent,
    OpCapacitiesStepGroupOrDrugstoreComponent,
    OpCapacitiesStepEditionModeComponent,
    OpCapacitiesStepCapacityTableComponent,
    OpCapacitiesStepExpressResourceComponent,
    OpCapacitiesStepCapacityTableFormComponent,
    OpCapacitiesDrugstoreDefaultCapacityComponent,
    OpCapacitiesDrugstoreDefaultCapacityCardComponent,
    OpCapacitiesDrugstoreDefaultCapacityDialogComponent,
    OperationsIntervalExpressComponent,
    OpIntervalsStepSetExpressComponent,
    OperationsCapacityIntervalComponent,
    OperationsCapacityIntervalUploadComponent,
    OpCapacitiesIntervalStepUploadComponent,
    OpCapacitiesIntervalStepConfirmationComponent,
    BaseCapacityEditionExpress,
    BaseCapacityEditionTableForm,
  ],
  imports: [
    CommonModule,
    CapacityServiceTypeRoutingModule,
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
    TagModule
  ],
  providers: [
    OperationsCapacitiesImplementService,
    DrugStoreServiceStore,
    IntervalTimeExpressFormService,
    OpCapacitiesStepExpressResourceService,
    OpCapacitiesStepExpressResourceFormService,
    OpCapacitiesStepEditionModeService,
    OpCapacitiesStepGroupOrDrugstoreService,
    OperationsCapacityScheduledService,
    OperationsCapacityScheduledStoreService,
    OpCapacitiesStepCapacityTableService,
    OpCapacitiesStepCapacityTableFormService,
    OperationsCapacityAmPmService,
    OperationsCapacityAmPmStoreService,
    OperationsCapacityRetService,
    OperationsCapacityRetStoreService,
  ],
})
export class CapacityServiceTypeModule {}

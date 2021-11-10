import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsDrugstoresRoutingModule } from './operations-drugstores-routing.module';
import { OperationsDrugstoresComponent } from './operations-drugstores.component';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { UnderConstructionModule } from '@pages/under-construction/under-construction.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { TableModule } from '@molecules/table/table.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { TagModule } from '@atoms/tag/tag.module';
import { TabModule } from '@molecules/tab/tab.module';
import { CardModule } from '@molecules/cards/card.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { OperationsDrugstoresImplementService } from './implements/operations-drugstores-implement.service';
import { OperationsDrugstoresHomeComponent } from './views/operations-drugstores-home/operations-drugstores-home.component';
import { OperationsDrugstoresEditionComponent } from './views/operations-drugstores-edition/operations-drugstores-edition.component';
import { OperationsDrugstoresEditionHomeComponent } from './views/operations-drugstores-edition/views/operations-drugstores-edition-home/operations-drugstores-edition-home.component';
import { OperationsDrugstoresEditionDrugstoreComponent } from './views/operations-drugstores-edition/views/operations-drugstores-edition-drugstore/operations-drugstores-edition-drugstore.component';
import { OperationsDrugstoresEditionServiceTypeComponent } from './views/operations-drugstores-edition/views/operations-drugstores-edition-service-type/operations-drugstores-edition-service-type.component';
import { OpDrugstoresHomeDrugstoreDetailDialogComponent } from './views/operations-drugstores-home/components/op-drugstores-home-drugstore-detail-dialog/op-drugstores-home-drugstore-detail-dialog.component';
import { OpDrugstoresEditionHomeMainServiceTypeCardComponent } from './views/operations-drugstores-edition/components/op-drugstores-edition-home-main-service-type-card/op-drugstores-edition-home-main-service-type-card.component';
import { OpDrugstoresEditionHomeDrugstoreDetailCardComponent } from './views/operations-drugstores-edition/components/op-drugstores-edition-home-drugstore-detail-card/op-drugstores-edition-home-drugstore-detail-card.component';
import { SwitchModule } from '@atoms/switch/switch.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '@atoms/select/select.module';
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';
import { FormFieldModule } from '@molecules/form-field/form-field.module';
import { OpDrugstoresEditionDrugstoreDetailCardComponent } from './views/operations-drugstores-edition/components/op-drugstores-edition-drugstore-detail-card/op-drugstores-edition-drugstore-detail-card.component';
import { OpDrugstoresEditionDrugstoreDetailFormCardComponent } from './views/operations-drugstores-edition/components/op-drugstores-edition-drugstore-detail-form-card/op-drugstores-edition-drugstore-detail-form-card.component';
import { OpDrugstoresEditionServiceTypeDetailFormCardComponent } from './views/operations-drugstores-edition/components/op-drugstores-edition-service-type-detail-form-card/op-drugstores-edition-service-type-detail-form-card.component';
import { PaginatorModule } from '@atoms/paginator/paginator.module';
import { SkeletonModule } from '@molecules/skeleton/skeleton.module';
import { DirectivesModule } from '../../../../shared/directives/directives.module';
import { EmptyResultModule } from '@pages/empty-result/empty-result.module';
import { InputTimeModule } from '@atoms/input-time/input-time.module';
import { OpDrugstoresEditionServiceTypeDetailDialogComponent } from './views/operations-drugstores-edition/components/op-drugstores-edition-service-type-detail-dialog/op-drugstores-edition-service-type-detail-dialog.component';
import { LinksModule } from '@atoms/links/links.module';
import { HttpErrorViewerModule } from '@pages/http-error-viewer/http-error-viewer.module';
import { NotSearchResultModule } from '@pages/not-search-result/not-search-result.module';
import { OpDrugstoresEditionHomeMainSettingTabComponent } from './views/operations-drugstores-edition/components/op-drugstores-edition-home-main-setting-tab/op-drugstores-edition-home-main-setting-tab.component';
import { OpDrugstoresEditionHomeZonesSettingTabComponent } from './views/operations-drugstores-edition/components/op-drugstores-edition-home-zones-setting-tab/op-drugstores-edition-home-zones-setting-tab.component';
import { OperationsDrugstoresServiceTypeEditionGuard } from './guards/operations-drugstores-service-type-edition-guard.service';


@NgModule({
  declarations: [
    OperationsDrugstoresComponent,
    OperationsDrugstoresHomeComponent,
    OperationsDrugstoresEditionComponent,
    OperationsDrugstoresEditionHomeComponent,
    OperationsDrugstoresEditionDrugstoreComponent,
    OperationsDrugstoresEditionServiceTypeComponent,
    OpDrugstoresHomeDrugstoreDetailDialogComponent,
    OpDrugstoresEditionHomeMainServiceTypeCardComponent,
    OpDrugstoresEditionHomeMainSettingTabComponent,
    OpDrugstoresEditionHomeDrugstoreDetailCardComponent,
    OpDrugstoresEditionHomeZonesSettingTabComponent,
    OpDrugstoresEditionDrugstoreDetailCardComponent,
    OpDrugstoresEditionDrugstoreDetailFormCardComponent,
    OpDrugstoresEditionServiceTypeDetailFormCardComponent,
    OpDrugstoresEditionServiceTypeDetailDialogComponent,
  ],
  imports: [
    CommonModule,
    OperationsDrugstoresRoutingModule,
    BackRouterModule,
    UnderConstructionModule,
    InputsModule,
    MatTableModule,
    MatSortModule,
    ButtonsModule,
    TooltipModule,
    TableModule,
    IconsModule,
    TagModule,
    TabModule,
    CardModule,
    MatDialogModule,
    DialogModule,
    SwitchModule,
    ReactiveFormsModule,
    SelectModule,
    CheckboxModule,
    FormFieldModule,
    FormsModule,
    PaginatorModule,
    SkeletonModule,
    DirectivesModule,
    EmptyResultModule,
    InputTimeModule,
    LinksModule,
    HttpErrorViewerModule,
    NotSearchResultModule
  ],
  providers: [
    OperationsDrugstoresImplementService,
    OperationsDrugstoresServiceTypeEditionGuard
  ]
})
export class OperationsDrugstoresModule { }

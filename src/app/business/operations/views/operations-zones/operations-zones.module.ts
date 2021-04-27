import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsZonesRoutingModule } from './operations-zones-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { TagModule } from '@atoms/tag/tag.module';
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';
import { PaginatorModule } from '@atoms/paginator/paginator.module';
import { TableModule } from '@molecules/table/table.module';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { BackRouterModule } from '@molecules/back-router/back-router.module';

import { OperationsZonesComponent } from './operations-zones.component';
import { OperationsZonesHomeComponent } from './views/operations-zones-home/operations-zones-home.component';
import { OperationsZonesEditionComponent } from './views/operations-zones-edition/operations-zones-edition.component';
import { OperationsZonesEditionHomeComponent } from './views/operations-zones-edition/views/operations-zones-edition-home/operations-zones-edition-home.component';
import { OperationsZonesEditionServiceTypeComponent } from './views/operations-zones-edition/views/operations-zones-edition-service-type/operations-zones-edition-service-type.component';
import { OperationsZonesEditionZoneComponent } from './views/operations-zones-edition/views/operations-zones-edition-zone/operations-zones-edition-zone.component';
import { OpZonesHomeZoneDetailDialogComponent } from './views/operations-zones-home/components/op-zones-home-zone-detail-dialog/op-zones-home-zone-detail-dialog.component';
import { OpZonesEditionHomeZoneDetailCardComponent } from './views/operations-zones-edition/components/op-zones-edition-home-zone-detail-card/op-zones-edition-home-zone-detail-card.component';
import { OpZonesEditionHomeMainServiceTypeCardComponent } from './views/operations-zones-edition/components/op-zones-edition-home-main-service-type-card/op-zones-edition-home-main-service-type-card.component';
import { OpZonesEditionZoneDetailCardComponent } from './views/operations-zones-edition/components/op-zones-edition-zone-detail-card/op-zones-edition-zone-detail-card.component';
import { OpZonesEditionZoneDetailFormCardComponent } from './views/operations-zones-edition/components/op-zones-edition-zone-detail-form-card/op-zones-edition-zone-detail-form-card.component';
import { OpZonesEditionServiceTypeDetailCardComponent } from './views/operations-zones-edition/components/op-zones-edition-service-type-detail-card/op-zones-edition-service-type-detail-card.component';
import { OpZonesEditionServiceTypeDetailFormCardComponent } from './views/operations-zones-edition/components/op-zones-edition-service-type-detail-form-card/op-zones-edition-service-type-detail-form-card.component';
import { OpZonesEditionServiceTypeDetailDialogComponent } from './views/operations-zones-edition/components/op-zones-edition-service-type-detail-dialog/op-zones-edition-service-type-detail-dialog.component';

import { OperationsZonesImplementService } from './implements/operations-zones-implement.service';
import { CardModule } from '@molecules/cards/card.module';
import { SelectTabModule } from '@atoms/select-tab/select-tab.module';
import { SwitchModule } from '@atoms/switch/switch.module';
import { FormFieldModule } from '@molecules/form-field/form-field.module';
import { SelectSearchModule } from '@atoms/select-search/select-search.module';
import { SelectModule } from '@atoms/select/select.module';
import { RadioModule } from '@atoms/radio/radio.module';
import { AlertModule } from '@molecules/alert/alert.module';
import { DirectivesModule } from '../../../../shared/directives/directives.module';
import { LinksModule } from '@atoms/links/links.module';
import { InputTimeModule } from '@atoms/input-time/input-time.module';
import { SkeletonModule } from '@molecules/skeleton/skeleton.module';
import { EmptyResultModule } from '@pages/empty-result/empty-result.module';
import { TabModule } from '@molecules/tab/tab.module';
import { OpZonesEditionHomeMainSettingTabComponent } from './views/operations-zones-edition/components/op-zones-edition-home-main-setting-tab/op-zones-edition-home-main-setting-tab.component';
import { OpZonesEditionHomeBackupSettingTabComponent } from './views/operations-zones-edition/components/op-zones-edition-home-backup-setting-tab/op-zones-edition-home-backup-setting-tab.component';
import { OpZonesEditionHomeBackupStockBackupCardComponent } from './views/operations-zones-edition/components/op-zones-edition-home-backup-stock-backup-card/op-zones-edition-home-backup-stock-backup-card.component';
import { OpZonesEditionHomeBackupServiceTypeCardComponent } from './views/operations-zones-edition/components/op-zones-edition-home-backup-service-type-card/op-zones-edition-home-backup-service-type-card.component';
import { OperationsZonesEditionBackupComponent } from './views/operations-zones-edition/views/operations-zones-edition-backup/operations-zones-edition-backup.component';
import { OperationsZonesEditionBackupServiceTypeComponent } from './views/operations-zones-edition/views/operations-zones-edition-backup-service-type/operations-zones-edition-backup-service-type.component';
import { OpZonesEditionBackupDetailCardComponent } from './views/operations-zones-edition/components/op-zones-edition-backup-detail-card/op-zones-edition-backup-detail-card.component';
import { OpZonesEditionBackupDetailFormCardComponent } from './views/operations-zones-edition/components/op-zones-edition-backup-detail-form-card/op-zones-edition-backup-detail-form-card.component';
import { OpZonesEditionBackupServiceTypeDetailFormCardComponent } from './views/operations-zones-edition/components/op-zones-edition-backup-service-type-detail-form-card/op-zones-edition-backup-service-type-detail-form-card.component';
import { OpZonesEditionBackupServiceTypeDetailCardComponent } from './views/operations-zones-edition/components/op-zones-edition-backup-service-type-detail-card/op-zones-edition-backup-service-type-detail-card.component';
import { GuardServiceModule } from '@guards/guard-service.module';
import { OperationsZoneServiceTypeEditionGuard } from './guards/operations-zone-service-type-edition-guard.service';
import { GenericErrorModule } from '@pages/generic-error/generic-error.module';
import { NotSearchResultModule } from '@pages/not-search-result/not-search-result.module';


@NgModule({
    declarations: [
        OperationsZonesComponent,
        OperationsZonesHomeComponent,
        OperationsZonesEditionComponent,
        OperationsZonesEditionHomeComponent,
        OperationsZonesEditionServiceTypeComponent,
        OperationsZonesEditionZoneComponent,
        OpZonesHomeZoneDetailDialogComponent,
        OpZonesEditionHomeZoneDetailCardComponent,
        OpZonesEditionHomeMainServiceTypeCardComponent,
        OpZonesEditionZoneDetailCardComponent,
        OpZonesEditionZoneDetailFormCardComponent,
        OpZonesEditionServiceTypeDetailCardComponent,
        OpZonesEditionServiceTypeDetailFormCardComponent,
        OpZonesEditionServiceTypeDetailDialogComponent,
        OpZonesEditionHomeMainSettingTabComponent,
        OpZonesEditionHomeBackupSettingTabComponent,
        OpZonesEditionHomeBackupStockBackupCardComponent,
        OpZonesEditionHomeBackupServiceTypeCardComponent,
        OperationsZonesEditionBackupComponent,
        OperationsZonesEditionBackupServiceTypeComponent,
        OpZonesEditionBackupDetailCardComponent,
        OpZonesEditionBackupDetailFormCardComponent,
        OpZonesEditionBackupServiceTypeDetailFormCardComponent,
        OpZonesEditionBackupServiceTypeDetailCardComponent
    ],
    imports: [
        CommonModule,
        OperationsZonesRoutingModule,
        GuardServiceModule,
        BackRouterModule,
        InputsModule,
        MatTableModule,
        MatSortModule,
        TableModule,
        TooltipModule,
        ButtonsModule,
        TagModule,
        IconsModule,
        CheckboxModule,
        DialogModule,
        MatDialogModule,
        FormsModule,
        PaginatorModule,
        CardModule,
        SelectTabModule,
        SwitchModule,
        FormFieldModule,
        SelectSearchModule,
        SelectModule,
        ReactiveFormsModule,
        RadioModule,
        AlertModule,
        DirectivesModule,
        LinksModule,
        InputTimeModule,
        SkeletonModule,
        EmptyResultModule,
        TabModule,
        GenericErrorModule,
        NotSearchResultModule
    ],
    providers: [
        OperationsZonesImplementService,
        OperationsZoneServiceTypeEditionGuard
    ]
})
export class OperationsZonesModule {
}

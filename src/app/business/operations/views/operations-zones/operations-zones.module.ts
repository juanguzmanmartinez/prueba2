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
import { OpZonesEditionHomeServiceTypeCardComponent } from './views/operations-zones-edition/components/op-zones-edition-home-service-type-card/op-zones-edition-home-service-type-card.component';
import { OpZonesEditionZoneDetailCardComponent } from './views/operations-zones-edition/components/op-zones-edition-zone-detail-card/op-zones-edition-zone-detail-card.component';
import { OpZonesEditionZoneDetailFormCardComponent } from './views/operations-zones-edition/components/op-zones-edition-zone-detail-form-card/op-zones-edition-zone-detail-form-card.component';
import { OpZonesEditionServiceTypeDetailCardComponent } from './views/operations-zones-edition/components/op-zones-edition-service-type-detail-card/op-zones-edition-service-type-detail-card.component';
import { OpZonesEditionServiceTypeDetailFormCardComponent } from './views/operations-zones-edition/components/op-zones-edition-service-type-detail-form-card/op-zones-edition-service-type-detail-form-card.component';
import { OpZonesEditionServiceTypeDetailDialogComponent } from './views/operations-zones-edition/components/op-zones-edition-service-type-detail-dialog/op-zones-edition-service-type-detail-dialog.component';

import { OperationsZonesImplementService } from './implements/operations-zones-implement.service';
import { CardModule } from '@molecules/cards/card.module';
import { MatTabsModule } from '@angular/material/tabs';
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
        OpZonesEditionHomeServiceTypeCardComponent,
        OpZonesEditionZoneDetailCardComponent,
        OpZonesEditionZoneDetailFormCardComponent,
        OpZonesEditionServiceTypeDetailCardComponent,
        OpZonesEditionServiceTypeDetailFormCardComponent,
        OpZonesEditionServiceTypeDetailDialogComponent
    ],
    imports: [
        CommonModule,
        OperationsZonesRoutingModule,
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
        MatTabsModule,
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
        EmptyResultModule
    ],
    providers: [
        OperationsZonesImplementService
    ]
})
export class OperationsZonesModule {
}

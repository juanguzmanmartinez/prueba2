import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsStoresRoutingModule } from './operations-stores-routing.module';
import { OperationsStoresComponent } from './operations-stores.component';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { PagesModule } from '@pages/pages.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { TableModule } from '@molecules/table/table.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { TagModule } from '@atoms/tag/tag.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CardModule } from '@molecules/cards/card.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { OperationsStoresImplementService } from './implements/operations-stores-implement.service';
import { OperationsStoresHomeComponent } from './views/operations-stores-home/operations-stores-home.component';
import { OperationsStoresEditionComponent } from './views/operations-stores-edition/operations-stores-edition.component';
import { OperationsStoresEditionHomeComponent } from './views/operations-stores-edition/operations-stores-edition-home/operations-stores-edition-home.component';
import { OperationsStoresEditionStoreComponent } from './views/operations-stores-edition/operations-stores-edition-store/operations-stores-edition-store.component';
import { OperationsStoresEditionServiceTypeComponent } from './views/operations-stores-edition/operations-stores-edition-service-type/operations-stores-edition-service-type.component';
import { OpStoresStoreDetailDialogComponent } from './components/op-stores-store-detail-dialog/op-stores-store-detail-dialog.component';
import { OpStoresEditionHomeServiceTypeCardComponent } from './components/op-stores-edition-home-service-type-card/op-stores-edition-home-service-type-card.component';
import { OpStoresEditionHomeStoreDetailCardComponent } from './components/op-stores-edition-home-store-detail-card/op-stores-edition-home-store-detail-card.component';
import { SwitchModule } from '@atoms/switch/switch.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '@atoms/select/select.module';
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';
import { FormFieldModule } from '@molecules/form-field/form-field.module';
import { OpStoresEditionStoreDetailCardComponent } from './components/op-stores-edition-store-detail-card/op-stores-edition-store-detail-card.component';
import { OpStoresEditionStoreDetailFormCardComponent } from './components/op-stores-edition-store-detail-form-card/op-stores-edition-store-detail-form-card.component';
import { OpStoresEditionServiceTypeFormCardComponent } from './components/op-stores-edition-service-type-form-card/op-stores-edition-service-type-form-card.component';


@NgModule({
    declarations: [
        OperationsStoresComponent,
        OperationsStoresHomeComponent,
        OperationsStoresEditionComponent,
        OpStoresStoreDetailDialogComponent,
        OperationsStoresEditionHomeComponent,
        OperationsStoresEditionStoreComponent,
        OperationsStoresEditionServiceTypeComponent,
        OpStoresEditionHomeServiceTypeCardComponent,
        OpStoresEditionHomeStoreDetailCardComponent,
        OpStoresEditionStoreDetailCardComponent,
        OpStoresEditionStoreDetailFormCardComponent,
        OpStoresEditionServiceTypeFormCardComponent
    ],
    imports: [
        CommonModule,
        OperationsStoresRoutingModule,
        BackRouterModule,
        PagesModule,
        InputsModule,
        MatTableModule,
        MatSortModule,
        ButtonsModule,
        TooltipModule,
        TableModule,
        IconsModule,
        TagModule,
        MatTabsModule,
        CardModule,
        MatDialogModule,
        DialogModule,
        SwitchModule,
        ReactiveFormsModule,
        SelectModule,
        CheckboxModule,
        FormFieldModule
    ],
    providers: [
        OperationsStoresImplementService
    ]
})
export class OperationsStoresModule {
}

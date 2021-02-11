import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsStoresRoutingModule } from './operations-stores-routing.module';
import { OperationsStoresComponent } from './operations-stores.component';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { PagesModule } from '@pages/pages.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { OperationsStoresHomeComponent } from './views/operations-stores-home/operations-stores-home.component';
import { OperationsStoresEditionComponent } from './views/operations-stores-edition/operations-stores-edition.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { TableModule } from '@molecules/table/table.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { TagModule } from '@atoms/tag/tag.module';


@NgModule({
  declarations: [
    OperationsStoresComponent,
    OperationsStoresHomeComponent,
    OperationsStoresEditionComponent
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
        TagModule
    ]
})
export class OperationsStoresModule { }

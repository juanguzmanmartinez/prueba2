import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { OperationsSidenavComponent } from './components/operations-sidenav/operations-sidenav.component';
import { SharedModule } from '../../shared/shared.module';
import { IconsModule } from '../../core/atoms/icons/icons.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { OperationsHomeComponent } from './views/operations-home/operations-home.component';
import { LinksModule } from '../../core/atoms/links/links.module';
import { ButtonsModule } from '../../core/atoms/buttons/buttons.module';
import { CardModule } from '../../core/molecules/cards/card.module';
import { InnerSidenavModule } from '../../core/organisms/inner-sidenav/inner-sidenav.module';


@NgModule({
  declarations: [
    OperationsComponent,
    OperationsSidenavComponent,
    OperationsHomeComponent,
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    SharedModule,
    IconsModule,
    MatExpansionModule,
    LinksModule,
    ButtonsModule,
    CardModule,
    InnerSidenavModule,
  ]
})
export class OperationsModule {
}

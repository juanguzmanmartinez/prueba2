import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { OperationsSidenavComponent } from './components/operations-sidenav/operations-sidenav.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { OperationsHomeComponent } from './views/operations-home/operations-home.component';
import { LinksModule } from '@atoms/links/links.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { CardModule } from '@molecules/cards/card.module';
import { InnerSidenavModule } from '@organisms/inner-sidenav/inner-sidenav.module';
import { ClientsServiceModule } from '@clients/clients-service.module';


@NgModule({
  declarations: [
    OperationsComponent,
    OperationsSidenavComponent,
    OperationsHomeComponent,
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    ClientsServiceModule,
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

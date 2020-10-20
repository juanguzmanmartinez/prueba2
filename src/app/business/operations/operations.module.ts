import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OperationsRoutingModule} from './operations-routing.module';
import {OperationsComponent} from './operations.component';
import {OperationsSidenavComponent} from './components/operations-sidenav/operations-sidenav.component';
import {SharedModule} from '../../shared/shared.module';
import {IconsModule} from '../../commons/core-components/icons/icons.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { OperationsHomeComponent } from './views/operations-home/operations-home.component';
import {LinksModule} from '../../commons/core-components/links/links.module';
import {ButtonsModule} from '../../commons/core-components/buttons/buttons.module';
import {CardModule} from '../../commons/molecules/cards/card.module';


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
        CardModule
    ]
})
export class OperationsModule {
}

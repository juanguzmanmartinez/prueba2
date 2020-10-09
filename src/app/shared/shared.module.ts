import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DrugstoreClientService} from './services/calendar/drugstores-client.service';
import {GenericService} from './services/generic.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CalendarClientService} from './services/calendar/calendar-client.service';
import {CapacityClientService} from './services/capacity-edition/capacity-edition.service';
import {LocalClientService} from './services/calendar/local-client.service';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {CapacityImplementService} from './services/capacity-edition/capacity-implements.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {InnerSidenavComponent} from './components/inner-sidenav/inner-sidenav.component';
import {CoreComponentsModule} from '../commons/core-components/core-components.module';
import {IconsModule} from '../commons/core-components/icons/icons.module';
import {InnerSidenavNavigationComponent} from './components/inner-sidenav/components/inner-sidenav-navigation/inner-sidenav-navigation.component';
import {InnerSidenavNavigationExpansionComponent} from './components/inner-sidenav/components/inner-sidenav-navigation-expansion/inner-sidenav-navigation-expansion.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {TooltipModule} from '../commons/core-components/tooltip/tooltip.module';
import {PIPES} from './pipes/pipes.index';

const SERVICE = [
  DrugstoreClientService,
  CalendarClientService,
  CapacityClientService,
  GenericService,
  LocalClientService,
  CapacityImplementService
];


@NgModule({
  declarations: [
    SidenavComponent,
    InnerSidenavComponent,
    InnerSidenavNavigationComponent,
    InnerSidenavNavigationExpansionComponent,
    ...PIPES],
  exports: [
    SidenavComponent,
    InnerSidenavComponent,
    InnerSidenavNavigationComponent,
    InnerSidenavNavigationExpansionComponent,
    ...PIPES
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    RouterModule,
    CoreComponentsModule,
    IconsModule,
    MatExpansionModule,
    TooltipModule,
  ],
  providers: [
    ...SERVICE
  ]
})
export class SharedModule {
}

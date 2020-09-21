import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrugstoreClientService } from './services/calendar/drugstores-client.service';
import { GenericService } from './services/generic.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CalendarClientService } from './services/calendar/calendar-client.service';
import { CapacityClientService } from './services/capacity-edition/capacity-edition.service';
import { LocalClientService } from './services/calendar/local-client.service';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CapacityImplementService } from './services/capacity-edition/capacity-implements.service';

const SERVICE = [
  DrugstoreClientService,
  CalendarClientService,
  CapacityClientService,
  GenericService,
  LocalClientService,
  CapacityImplementService
];


@NgModule({
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    ...SERVICE
  ]
})
export class SharedModule { }

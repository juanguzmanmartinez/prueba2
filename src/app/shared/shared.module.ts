import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarClientService } from './services/calendar/calendar-client.service';
import { GenericService } from './services/generic.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const SERVICE = [
  CalendarClientService,
  GenericService
];


@NgModule({
  declarations: [],
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

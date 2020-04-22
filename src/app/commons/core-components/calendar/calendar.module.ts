import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarItemComponent } from './calendar-item/calendar-item.component';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
import { FormsModule } from '@angular/forms';
import { CoreComponentsModule } from '../core-components.module';
import { CalendarButtonComponent } from './calendar-button/calendar-button.component';

const COMPONENTS = [ CalendarBodyComponent, CalendarItemComponent, CalendarHeaderComponent, CalendarButtonComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    CoreComponentsModule
  ]
})
export class CalendarModule { }

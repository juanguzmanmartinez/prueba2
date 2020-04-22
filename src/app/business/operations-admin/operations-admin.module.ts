import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsAdminComponent } from './operations-admin.component';
import { OperationsAdminRoutingModule } from './operations-admin.routing.module';
// import { CommonsModule } from 'src/app/commons/commons.module';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { CalendarModule } from 'src/app/commons/core-components/calendar/calendar.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [OperationsAdminComponent],
  imports: [
    CommonModule,
    OperationsAdminRoutingModule,
    CoreComponentsModule,
    CalendarModule,
    FormsModule
  ]
})
export class OperationsAdminModule { }

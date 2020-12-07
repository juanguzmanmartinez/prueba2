import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { BusinessRoutingModule } from './business-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SidenavModule } from '../core/organisms/sidenav/sidenav.module';


@NgModule({
  declarations: [BusinessComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    SharedModule,
    SidenavModule,
  ]
})
export class BusinessModule { }

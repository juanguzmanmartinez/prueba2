import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessFactoriesModule } from '../commons/business-factories/business-factories.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BusinessComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    BusinessFactoriesModule.forChild(),
    SharedModule
  ]
})
export class BusinessModule { }

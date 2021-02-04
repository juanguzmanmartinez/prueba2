import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { BusinessRoutingModule } from './business-routing.module';
import { SidenavModule } from '@organisms/sidenav/sidenav.module';
import { GuardServiceModule } from '@guards/guard-service.module';


@NgModule({
    declarations: [BusinessComponent],
    imports: [
        CommonModule,
        BusinessRoutingModule,
        SidenavModule,
        GuardServiceModule
    ]
})
export class BusinessModule {
}

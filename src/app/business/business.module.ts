import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { BusinessRoutingModule } from './business-routing.module';
import { SidenavModule } from '@organisms/sidenav/sidenav.module';


@NgModule({
    declarations: [BusinessComponent],
    imports: [
        CommonModule,
        BusinessRoutingModule,
        SidenavModule,
    ]
})
export class BusinessModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { BusinessRoutingModule } from './business-routing.module';
import { GuardServiceModule } from '@guards/guard-service.module';
import { NavigationModule } from '@organisms/navigation/navigation.module';


@NgModule({
    declarations: [BusinessComponent],
    imports: [
        CommonModule,
        BusinessRoutingModule,
        GuardServiceModule,
        NavigationModule
    ]
})
export class BusinessModule {
}

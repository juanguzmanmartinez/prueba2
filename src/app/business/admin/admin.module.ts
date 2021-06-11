import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdministratorSidenavComponent } from './components/administrator-sidenav/administrator-sidenav.component';
import { InnerSidenavModule } from '@organisms/inner-sidenav/inner-sidenav.module';
import { LinksModule } from '@atoms/links/links.module';
import { DirectivesModule } from '../../shared/directives/directives.module';


@NgModule({
    declarations: [
        AdminComponent,
        AdministratorSidenavComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        InnerSidenavModule,
        LinksModule,
        DirectivesModule
    ]
})
export class AdminModule {
}

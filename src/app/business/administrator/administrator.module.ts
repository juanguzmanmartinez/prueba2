import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorComponent } from './administrator.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorSidenavComponent } from './components/administrator-sidenav/administrator-sidenav.component';
import { InnerSidenavModule } from '@organisms/inner-sidenav/inner-sidenav.module';
import { LinksModule } from '@atoms/links/links.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { AdministratorHomeComponent } from './views/administrator-home/administrator-home.component';
import { CardModule } from '@molecules/cards/card.module';


@NgModule({
    declarations: [
        AdministratorComponent,
        AdministratorSidenavComponent,
        AdministratorHomeComponent
    ],
    imports: [
        CommonModule,
        AdministratorRoutingModule,
        InnerSidenavModule,
        LinksModule,
        DirectivesModule,
        CardModule
    ]
})
export class AdministratorModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorComponent } from './administrator.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { LinksModule } from '@atoms/links/links.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { AdministratorHomeComponent } from './views/administrator-home/administrator-home.component';
import { CardModule } from '@molecules/cards/card.module';


@NgModule({
    declarations: [
        AdministratorComponent,
        AdministratorHomeComponent
    ],
    imports: [
        CommonModule,
        AdministratorRoutingModule,
        LinksModule,
        DirectivesModule,
        CardModule
    ]
})
export class AdministratorModule {
}

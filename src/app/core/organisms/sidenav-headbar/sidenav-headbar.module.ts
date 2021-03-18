import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavHeadbarComponent } from './sidenav-headbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LinksModule } from '@atoms/links/links.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { ProfileModule } from '@organisms/profile/profile.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { SidenavNavigationComponent } from '@organisms/sidenav-headbar/components/sidenav-navigation/sidenav-navigation.component';
import { HeadbarComponent } from './views/headbar/headbar.component';
import { SidenavComponent } from './views/sidenav/sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        SidenavHeadbarComponent,
        SidenavNavigationComponent,
        HeadbarComponent,
        SidenavComponent
    ],
    exports: [
        SidenavHeadbarComponent
    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        LinksModule,
        IconsModule,
        TooltipModule,
        ButtonsModule,
        ProfileModule,
        DirectivesModule,
        MatToolbarModule,
        MatMenuModule
    ]
})
export class SidenavHeadbarModule {
}

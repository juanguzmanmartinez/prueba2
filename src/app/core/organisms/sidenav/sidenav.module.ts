import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LinksModule } from '@atoms/links/links.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { ProfileModule } from '@organisms/profile/profile.module';


@NgModule({
  declarations: [
    SidenavComponent,
  ],
  exports: [
    SidenavComponent
  ],
    imports: [
        CommonModule,
        MatSidenavModule,
        LinksModule,
        IconsModule,
        TooltipModule,
        ButtonsModule,
        ProfileModule
    ]
})
export class SidenavModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { IconsModule } from '../commons/core-components/icons/icons.module';
import { InnerSidenavNavigationComponent } from './inner-sidenav/components/inner-sidenav-navigation/inner-sidenav-navigation.component';
import { InnerSidenavNavigationExpansionComponent } from './inner-sidenav/components/inner-sidenav-navigation-expansion/inner-sidenav-navigation-expansion.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { InnerSidenavComponent } from './inner-sidenav/inner-sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TooltipModule } from '../commons/core-components/tooltip/tooltip.module';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { LinksModule } from '../commons/core-components/links/links.module';
import { ButtonsModule } from '../commons/core-components/buttons/buttons.module';

const COMPONENTS = [
  NotSupportedComponent,
  UnderConstructionComponent,
  SidenavComponent,
  InnerSidenavComponent,
  InnerSidenavNavigationComponent,
  InnerSidenavNavigationExpansionComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IconsModule,
    MatSidenavModule,
    TooltipModule,
    RouterModule,
    MatExpansionModule,
    LinksModule,
    ButtonsModule
  ]
})
export class CoreModule {
}

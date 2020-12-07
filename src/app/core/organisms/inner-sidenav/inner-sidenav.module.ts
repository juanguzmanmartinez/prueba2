import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerSidenavComponent } from './inner-sidenav.component';
import { InnerSidenavNavigationComponent } from './components/inner-sidenav-navigation/inner-sidenav-navigation.component';
import { InnerSidenavNavigationExpansionComponent } from './components/inner-sidenav-navigation-expansion/inner-sidenav-navigation-expansion.component';
import { LinksModule } from '../../atoms/links/links.module';
import { IconsModule } from '../../atoms/icons/icons.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    InnerSidenavComponent,
    InnerSidenavNavigationComponent,
    InnerSidenavNavigationExpansionComponent,
  ],
  exports: [
    InnerSidenavNavigationComponent,
    InnerSidenavNavigationExpansionComponent,
    InnerSidenavComponent
  ],
  imports: [
    CommonModule,
    LinksModule,
    IconsModule,
    MatExpansionModule,
    MatSidenavModule
  ]
})
export class InnerSidenavModule {
}

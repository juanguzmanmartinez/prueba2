import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadbarComponent } from './views/headbar/headbar.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LinksModule } from '@atoms/links/links.module';
import { ProfileModule } from '@organisms/profile/profile.module';
import { HeadbarProfilePreviewComponent } from '@organisms/navigation/components/headbar-profile-preview/headbar-profile-preview.component';
import { MatBadgeModule } from '@angular/material/badge';
import { HeadbarNotificationsPreviewComponent } from './components/headbar-notifications-preview/headbar-notifications-preview.component';
import { HeadbarSearchComponent } from './components/headbar-search/headbar-search.component';
import { HeadbarUserMenuComponent } from './components/headbar-user-menu/headbar-user-menu.component';
import { MenuModule } from '@molecules/menu/menu.module';
import { HeadbarModulesMenuComponent } from './components/headbar-modules-menu/headbar-modules-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from '@organisms/navigation/views/sidenav/sidenav.component';
import { NavigationComponent } from '@organisms/navigation/navigation.component';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { SidenavRouteComponent } from './components/sidenav-route/sidenav-route.component';
import { SidenavRouteExpansionComponent } from '@organisms/navigation/components/sidenav-route-expansion/sidenav-route-expansion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidenavRouteMenuComponent } from './components/sidenav-route-menu/sidenav-route-menu.component';
import { SidenavRouteMenuItemComponent } from './components/sidenav-route-menu-item/sidenav-route-menu-item.component';
import { NavigationService } from '@organisms/navigation/navigation.service';
import { HeadbarBreadcrumbsComponent } from './components/headbar-breadcrumbs/headbar-breadcrumbs.component';
import { SidenavOperationsComponent } from './views/sidenav/components/sidenav-operations/sidenav-operations.component';
import { SidenavAdministratorComponent } from './views/sidenav/components/sidenav-administrator/sidenav-administrator.component';
import { SidenavHomeComponent } from './views/sidenav/components/sidenav-home/sidenav-home.component';
import { SidenavOrderComponent } from './views/sidenav/components/sidenav-order/sidenav-order.component';
import { SidenavZonesComponent } from './views/sidenav/components/sidenav-zones/sidenav-zones.component';
import { SidenavCapacityComponent } from './views/sidenav/components/sidenav-capacity/sidenav-capacity.component';
import { SidenavControlTowerComponent } from './views/sidenav/components/sidenav-control-tower/sidenav-control-tower.component';


@NgModule({
    declarations: [
        NavigationComponent,
        HeadbarComponent,
        SidenavComponent,
        HeadbarProfilePreviewComponent,
        HeadbarNotificationsPreviewComponent,
        HeadbarSearchComponent,
        HeadbarUserMenuComponent,
        HeadbarModulesMenuComponent,
        HeadbarBreadcrumbsComponent,
        SidenavRouteComponent,
        SidenavRouteExpansionComponent,
        SidenavRouteMenuComponent,
        SidenavRouteMenuItemComponent,
        SidenavOperationsComponent,
        SidenavAdministratorComponent,
        SidenavHomeComponent,
        SidenavOrderComponent,
        SidenavZonesComponent,
        SidenavCapacityComponent,
        SidenavControlTowerComponent
    ],
    exports: [
        NavigationComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
        MatToolbarModule,
        LinksModule,
        ProfileModule,
        MatBadgeModule,
        MenuModule,
        MatSidenavModule,
        DirectivesModule,
        MatExpansionModule
    ],
    providers: [
        NavigationService
    ]
})
export class NavigationModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LinksModule } from '@atoms/links/links.module';
import { ProfileModule } from '@organisms/profile/profile.module';


@NgModule({
    declarations: [
        NavigationComponent
    ],
    exports: [
        NavigationComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
        MatToolbarModule,
        LinksModule,
        ProfileModule
    ]
})
export class NavigationModule {
}

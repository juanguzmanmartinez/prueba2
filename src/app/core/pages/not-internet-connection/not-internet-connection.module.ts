import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { LinksModule } from '@atoms/links/links.module';
import { NotInternetConnectionComponent } from './not-internet-connection.component';
import { NotInternetConnectionRoutingModule } from '@pages/not-internet-connection/not-internet-connection-routing.module';

@NgModule({
    declarations: [
        NotInternetConnectionComponent,
    ],
    imports: [
        CommonModule,
        IconsModule,
        ButtonsModule,
        LinksModule,
        NotInternetConnectionRoutingModule
    ]
})
export class NotInternetConnectionModule {
}

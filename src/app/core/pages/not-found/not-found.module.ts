import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { LinksModule } from '@atoms/links/links.module';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { NotFoundRoutingModule } from '@pages/not-found/not-found-routing.module';

@NgModule({
    declarations: [
        NotFoundComponent,
    ],
    imports: [
        CommonModule,
        IconsModule,
        ButtonsModule,
        LinksModule,
        NotFoundRoutingModule
    ]
})
export class NotFoundModule {
}

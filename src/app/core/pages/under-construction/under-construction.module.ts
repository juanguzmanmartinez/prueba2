import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderConstructionComponent } from './under-construction.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { LinksModule } from '@atoms/links/links.module';


@NgModule({
    declarations: [
        UnderConstructionComponent
    ],
    exports: [
        UnderConstructionComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
        ButtonsModule,
        LinksModule,
    ]
})
export class UnderConstructionModule {
}

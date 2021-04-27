import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotSearchResultComponent } from './not-search-result.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { LinksModule } from '@atoms/links/links.module';


@NgModule({
    declarations: [
        NotSearchResultComponent
    ],
    exports: [
        NotSearchResultComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
        ButtonsModule,
        LinksModule,
    ]
})
export class NotSearchResultModule {
}

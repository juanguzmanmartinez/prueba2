import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeoutErrorComponent } from './timeout-error.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { LinksModule } from '@atoms/links/links.module';
import { HelpersModule } from '@helpers/helpers.module';


@NgModule({
    declarations: [
        TimeoutErrorComponent
    ],
    exports: [
        TimeoutErrorComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
        ButtonsModule,
        LinksModule,
        HelpersModule
    ]
})
export class TimeoutErrorModule {
}

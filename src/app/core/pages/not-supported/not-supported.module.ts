import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { LinksModule } from '@atoms/links/links.module';
import { NotSupportedComponent } from '@pages/not-supported/not-supported.component';

@NgModule({
    declarations: [
        NotSupportedComponent
    ],
    exports: [
        NotSupportedComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
        ButtonsModule,
        LinksModule
    ]
})
export class NotSupportedModule {
}

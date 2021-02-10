import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { LinksModule } from '@atoms/links/links.module';

const COMPONENTS = [
    NotSupportedComponent,
    UnderConstructionComponent,
    NotFoundComponent,
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
        ButtonsModule,
        LinksModule
    ]
})
export class PagesModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { MatIconModule } from '@angular/material/icon';
import { IconAnimatedLoaderComponent } from '@atoms/icons/custom-icons/icon-animated-loader/icon-animated-loader.component';

const COMPONENTS = [
    IconComponent,
    IconAnimatedLoaderComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    imports: [
        CommonModule,
        MatIconModule,
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class IconsModule {
}

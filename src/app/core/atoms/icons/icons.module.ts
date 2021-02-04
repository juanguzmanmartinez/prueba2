import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { MatIconModule } from '@angular/material/icon';
import { IconsImplementService } from './service/icons-implement.service';


@NgModule({
    declarations: [IconsComponent],
    imports: [
        CommonModule,
        MatIconModule,
    ],
    exports: [
        IconsComponent
    ],
    providers: [
        IconsImplementService
    ]
})
export class IconsModule {
}

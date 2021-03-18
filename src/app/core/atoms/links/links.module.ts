import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterComponent } from './router/router.component';
import { RouterModule } from '@angular/router';
import { HrefComponent } from './href/href.component';


@NgModule({
    declarations: [
        RouterComponent,
        HrefComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        RouterComponent
    ]
})
export class LinksModule {
}

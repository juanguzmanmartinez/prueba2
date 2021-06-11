import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';
import { MAT_TAB_GROUP, MatTab, MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [
        TabGroupComponent,
        TabComponent,
    ],
    imports: [
        CommonModule,
        MatTabsModule
    ],
    exports: [
        TabGroupComponent,
        TabComponent
    ],
    providers: [
        {
            provide: MAT_TAB_GROUP,
            useValue: MatTab,
        },
    ],
})
export class TabModule {
}

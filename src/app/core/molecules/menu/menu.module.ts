import { NgModule } from '@angular/core';
import { MenuComponent } from '@molecules/menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from '@molecules/menu/components/menu-item/menu-item.component';
import { CommonModule } from '@angular/common';

const DECLARATIONS = [
    MenuComponent,
    MenuItemComponent
];

@NgModule({
    declarations: [...DECLARATIONS],
    exports: [...DECLARATIONS],
    imports: [
        MatMenuModule,
        CommonModule
    ]
})

export class MenuModule {
}

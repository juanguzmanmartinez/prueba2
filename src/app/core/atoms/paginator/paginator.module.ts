import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IconsModule } from '@atoms/icons/icons.module';


@NgModule({
    declarations: [PaginatorComponent],
    exports: [
        PaginatorComponent
    ],
    imports: [
        CommonModule,
        MatPaginatorModule,
        IconsModule
    ]
})
export class PaginatorModule {
}

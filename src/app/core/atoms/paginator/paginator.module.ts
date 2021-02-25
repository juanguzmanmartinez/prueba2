import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    declarations: [PaginatorComponent],
    exports: [
        PaginatorComponent
    ],
    imports: [
        CommonModule,
        MatPaginatorModule
    ]
})
export class PaginatorModule {
}

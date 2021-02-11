import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCellBaseDirective } from './table-cell-base/table-cell-base.directive';
import { TableSortingIconDirective } from '@molecules/table/table-sorting/table-sorting-icon.directive';
import { TableDirective } from './table.directive';
import { TableHeaderCellDirective } from './table-header-cell/table-header-cell.directive';

const COMPONENTS = [
    TableDirective,
    TableCellBaseDirective,
    TableSortingIconDirective,
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        TableHeaderCellDirective,
    ],
    exports: [
        ...COMPONENTS,
        TableHeaderCellDirective
    ],
    imports: [
        CommonModule
    ]
})
export class TableModule {
}

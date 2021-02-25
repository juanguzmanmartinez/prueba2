import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCellDirective } from './table-cell.directive';
import { TableSortingIconDirective } from '@molecules/table/table-sorting-icon.directive';
import { TableDirective } from './table.directive';
import { TableHeaderCellDirective } from './table-header-cell.directive';
import { TableRowDirective } from '@molecules/table/table-row.directive';
import { TableColumnWidthDirective } from '@molecules/table/table-column-width.directive';
import { TableHeaderRowDirective } from '@molecules/table/table-header-row.directive';
import { TableCustomColumnDirective } from '@molecules/table/table-custom-column.directive';

const COMPONENTS = [
    TableDirective,
    TableSortingIconDirective,
    TableHeaderRowDirective,
    TableHeaderCellDirective,
    TableRowDirective,
    TableCellDirective,
    TableColumnWidthDirective,
    TableCustomColumnDirective,
];

@NgModule({
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS,
    ],
    imports: [
        CommonModule
    ]
})
export class TableModule {
}

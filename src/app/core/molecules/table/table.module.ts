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
import { TableComponent } from '@molecules/table/table.component';
import { TableLoaderDirective } from '@molecules/table/table-loader.directive';

const DECLARATIONS = [
    TableComponent,
    TableDirective,
    TableSortingIconDirective,
    TableHeaderRowDirective,
    TableHeaderCellDirective,
    TableRowDirective,
    TableCellDirective,
    TableColumnWidthDirective,
    TableCustomColumnDirective,
    TableLoaderDirective,
];

@NgModule({
    declarations: [
        ...DECLARATIONS,
    ],
    exports: [
        ...DECLARATIONS,
    ],
    imports: [
        CommonModule
    ]
})
export class TableModule {
}

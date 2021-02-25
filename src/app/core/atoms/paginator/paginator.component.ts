import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements AfterViewInit {

    @Input() disabled: boolean;
    @Input() pageIndex: number;
    @Input() length: number;
    @Input() pageSize: number;
    @Input() pageSizeOptions: number[];
    @Input() hidePageSize: boolean;
    @Input() showFirstLastButtons: boolean;

    @Output() page = new EventEmitter<PageEvent>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {
    }

    ngAfterViewInit() {
        console.log(this.paginator);
    }

    pageEvent(event) {
        this.page.emit(event);
    }

}

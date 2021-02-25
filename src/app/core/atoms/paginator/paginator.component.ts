import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent {

    @Input() disabled: boolean;
    @Input() pageIndex: number;
    @Input() length: number;
    @Input() pageSize: number;
    @Input() pageSizeOptions: number[];
    @Input() showFirstLastButtons: boolean;

    @Output() page = new EventEmitter<PageEvent>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor() {
    }

    pageEvent(event) {
        this.page.emit(event);
    }

    goToPageEvent(index: number) {
        const previousPageIndex = this.paginator.pageIndex;
        this.paginator.pageIndex = index;
        const pageEvent: PageEvent = {
            pageIndex: this._pageIndex,
            length: this._length,
            pageSize: this._pageSize,
            previousPageIndex
        };
        this.paginator.page.emit(pageEvent);
    }

    get _length() {
        return this.paginator?.length || 0;
    }

    get _pageSize() {
        return this.paginator?.pageSize || 0;
    }

    get _pageIndex() {
        return this.paginator?.pageIndex || 0;
    }

    get _indexList() {
        const length = this.paginator?.getNumberOfPages() || 0;
        return Array.from({length}, (_, index) => index + 1);
    }

}

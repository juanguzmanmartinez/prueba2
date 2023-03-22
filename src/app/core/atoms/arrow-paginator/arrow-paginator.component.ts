import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-arrow-paginator',
  templateUrl: './arrow-paginator.component.html',
  styleUrls: ['./arrow-paginator.component.scss']
})
export class ArrowPaginatorComponent {
  @Input() currentPage: number;
  @Input() hasNextPage: boolean = true;
  @Input() hasNextPageData: boolean = true;
  @Output() changePage = new EventEmitter<number>();

  constructor() {}

  hasPreviousPage() {
    return this.currentPage > 1;
  }

  previousPage() {
    this.changePage.emit(this.currentPage - 1);
  }

  nextPage() {
    this.changePage.emit(this.currentPage + 1);
  }
}

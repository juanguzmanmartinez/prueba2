import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'fp-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex: number = 1;
  @Input() disabled: boolean;

  @Output() page = new EventEmitter<PageEvent>();

  get indexList(): number[] {
    const length = this.getNumberOfPages() || 0;
    return Array.from({ length }, (_, i) => i + 1);
  }

  get optionList(): Array<number | string> {
    const length = this.getNumberOfPages() || 0;
    const onlyPages = Array.from({ length }, (_, i) => i + 1);
    if (length <= 7) return onlyPages;
    if (length > 7) {
      if (this.pageIndex >= 1 && this.pageIndex <= 4) {
        const firstPart = onlyPages.slice(0, 5);
        return [...firstPart, '...', onlyPages[length - 1]];
      } else if (this.pageIndex <= length && this.pageIndex >= length - 3) {
        const lastPart = onlyPages.slice(-5);
        return [onlyPages[0], '...', ...lastPart];
      } else if (this.pageIndex > 4 && this.pageIndex < length - 3) {
        const middlePart = [
          this.pageIndex - 1,
          this.pageIndex,
          this.pageIndex + 1,
        ];
        return [
          onlyPages[0],
          '...',
          ...middlePart,
          '...',
          onlyPages[length - 1],
        ];
      }
    }
  }

  getNumberOfPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  goToPage(index: any) {
    if (index < 1 || index > this.getNumberOfPages() || index == '...') return;
    this.pageIndex = index;
    const pageEvent: PageEvent = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
    };
    this.page.emit(pageEvent);
  }

  previousPage() {
    this.goToPage(this.pageIndex - 1);
  }

  nextPage() {
    this.goToPage(this.pageIndex + 1);
  }
}

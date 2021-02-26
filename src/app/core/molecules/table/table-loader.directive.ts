import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: 'app-table-loader'
})
export class TableLoaderDirective implements AfterViewInit, OnDestroy {

    private rowLength = 6;
    private cellLength = 6;

    private killTrigger: Subject<void> = new Subject();

    @Input()
    set rows(rows: number) {
        this.rowLength = rows;
    }

    @Input()
    set cells(cells: number) {
        this.cellLength = cells;
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) {

    }

    ngAfterViewInit() {
        const parentElement = this.renderer.createElement('div');
        this.renderer.addClass(parentElement, 'table-loader-container');
        const rowLength = Array.from({length: this.rowLength}, (_, index) => index + 1);
        const cellLength = Array.from({length: this.cellLength}, (_, index) => index + 1);

        const cellWidth = ['10%', '12%', '8%', '11%'];
        const cellWidthByColumn = cellLength.map(() => cellWidth[Math.floor(Math.random() * cellWidth.length)]);
        for (const rowIndex of rowLength) {
            const rowElement = this.renderer.createElement('div');
            this.renderer.setStyle(rowElement, 'height', '64px');
            this.renderer.addClass(rowElement, 'border-gray-1');
            this.renderer.addClass(rowElement, 'd-flex-vertical-center');
            this.renderer.addClass(rowElement, 'justify-content-around');

            if (rowIndex % 2 === 0) {
                this.renderer.addClass(rowElement, 'bg-gray-1');
            }
            if (rowIndex === this.rowLength && rowIndex % 2 !== 0) {
                this.renderer.addClass(rowElement, 'border-bottom');
            }

            for (const cell of cellLength) {
                const cellElement = this.renderer.createElement('div');
                this.renderer.addClass(cellElement, 'rounded-pill');
                this.renderer.addClass(cellElement, 'bg-gray-3');
                this.renderer.setStyle(cellElement, 'height', '16px');
                this.renderer.setStyle(cellElement, 'width', cellWidthByColumn[cell - 1]);
                this.renderer.setStyle(cellElement, 'transition', 'opacity 1s');

                const seconds = [1300, 1500, 1200, 1400];
                const randomSecond = seconds[Math.floor(Math.random() * seconds.length)];
                timer(0, randomSecond)
                    .pipe(takeUntil(this.killTrigger))
                    .subscribe((index) => {
                        if (index % 2 === 0) {
                            this.renderer.setStyle(cellElement, 'opacity', '1');
                        } else {
                            this.renderer.setStyle(cellElement, 'opacity', '0.5');
                        }
                    });

                this.renderer.appendChild(rowElement, cellElement);
            }


            this.renderer.appendChild(parentElement, rowElement);
        }

        this.renderer.appendChild(this.elementRef.nativeElement, parentElement);
    }

    ngOnDestroy() {
        this.killTrigger.next();
    }


}

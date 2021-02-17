import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

    @Input() value = 'tooltip';
    @Input() innerClass = '';
    @Input() position: 'left' | 'right' | 'above' | 'below' | 'before' | 'after' = 'right';
    @Input() touchGestures: 'auto' | 'on' | 'off';
    @Input() showDelay: number;
    @Input() hideDelay: number;
    @Input() disabled: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

}

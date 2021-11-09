import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-action',
    templateUrl: './card-action.component.html',
    styleUrls: ['./card-action.component.sass']
})
export class CardActionComponent implements OnInit {

    @Input() cardIconSVG: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}

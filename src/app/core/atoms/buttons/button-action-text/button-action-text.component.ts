import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-button-action-text',
    templateUrl: './button-action-text.component.html',
    styleUrls: ['./button-action-text.component.scss']
})
export class ButtonActionTextComponent extends ButtonComponent implements OnInit {

    @Input() active: boolean;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

}

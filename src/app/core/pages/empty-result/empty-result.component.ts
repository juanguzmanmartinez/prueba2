import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-empty-result',
    templateUrl: './empty-result.component.html',
    styleUrls: ['./empty-result.component.sass']
})
export class EmptyResultComponent {
    @Output() action = new EventEmitter();


    actionEvent() {
        this.action.emit();
    }
}


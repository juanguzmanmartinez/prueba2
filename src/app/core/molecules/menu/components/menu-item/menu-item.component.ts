import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class MenuItemComponent {
    @Input() active: boolean;
}

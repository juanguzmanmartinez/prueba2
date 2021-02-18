import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidenav-navigation',
    templateUrl: './sidenav-navigation.component.html',
    styleUrls: ['./sidenav-navigation.component.scss']
})
export class SidenavNavigationComponent implements OnInit {

    @Input() navigationTooltip: string;
    @Input() navigationText: string;
    @Input() navigationRoute: string[] | string;

    constructor() {
    }

    ngOnInit(): void {
    }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-inner-sidenav-navigation',
    templateUrl: './inner-sidenav-navigation.component.html',
    styleUrls: ['./inner-sidenav-navigation.component.scss']
})
export class InnerSidenavNavigationComponent implements OnInit {

    @Input() navigationIcon: string;
    @Input() navigationText: string;
    @Input() navigationRoute: string[] | string;
    @Input() navigationRouteOptions: { exact: boolean } = {exact: true};

    constructor() {
    }

    ngOnInit(): void {
    }

}

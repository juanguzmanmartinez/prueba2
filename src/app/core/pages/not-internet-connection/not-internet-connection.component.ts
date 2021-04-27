import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-internet-connection',
    templateUrl: './not-internet-connection.component.html',
    styleUrls: ['./not-internet-connection.component.scss']
})
export class NotInternetConnectionComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    reloadPage() {
        window.location.reload();
    }
}

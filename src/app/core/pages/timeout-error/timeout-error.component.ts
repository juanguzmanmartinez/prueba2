import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timeout-error',
    templateUrl: './timeout-error.component.html',
    styleUrls: ['./timeout-error.component.scss']
})
export class TimeoutErrorComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    reloadPage() {
        window.location.reload();
    }
}

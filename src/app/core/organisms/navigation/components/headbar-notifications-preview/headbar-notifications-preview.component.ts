import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-headbar-notifications-preview',
    templateUrl: './headbar-notifications-preview.component.html',
    styleUrls: ['./headbar-notifications-preview.component.sass']
})
export class HeadbarNotificationsPreviewComponent implements OnInit {

    public notificationCounter;

    constructor() {
    }

    ngOnInit(): void {
    }

}

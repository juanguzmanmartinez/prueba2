import { Component, OnInit } from '@angular/core';
import { EProfileDialogType } from '@organisms/profile/parameters/profile-dialog-type.parameter';

@Component({
    templateUrl: './profile-user-information-dialog.component.html',
    styleUrls: ['./profile-user-information-dialog.component.scss']
})
export class ProfileUserInformationDialogComponent implements OnInit {

    public profileDialogType = EProfileDialogType;
    constructor() {
    }

    ngOnInit(): void {
    }

}

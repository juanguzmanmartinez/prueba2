import { Component, Input } from '@angular/core';
import { User } from '@models/auth/user.model';

@Component({
    selector: 'app-headbar-profile-preview',
    templateUrl: './headbar-profile-preview.component.html',
    styleUrls: ['./headbar-profile-preview.component.sass'],
})
export class HeadbarProfilePreviewComponent {

    @Input() user: User;

    constructor() {
    }

}

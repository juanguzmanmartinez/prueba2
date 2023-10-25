import { Component, ViewEncapsulation } from '@angular/core';
import { UserStoreService } from '@stores/user-store.service';
import { ProfileService } from '@organisms/profile/profile.service';

@Component({
    selector: 'app-headbar-user-menu',
    templateUrl: './headbar-user-menu.component.html',
    styleUrls: ['./headbar-menu.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class HeadbarUserMenuComponent {

    constructor(
        private userStore: UserStoreService,
        private profileService: ProfileService
    ) {
    }

    get user() {
        return this.userStore.currentUser;
    }

    openProfile() {
        this.profileService.openProfile();
    }

    logOut() {
        this.userStore.logout();
    }
}

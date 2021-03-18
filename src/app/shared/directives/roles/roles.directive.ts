import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '@parameters/auth/role.parameter';
import { UserStoreService } from '@stores/user-store.service';

@Directive({
    selector: '[appRoles]'
})
export class RolesDirective implements OnInit {

    private userRoles: Role[];

    @Input()
    set appRoles(roles: Role[]) {
        if (!roles || !roles.length) {
            throw new Error('Roles value is empty or missed');
        }
        this.userRoles = roles;
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private userStore: UserStoreService,
        private viewContainer: ViewContainerRef
    ) {
    }

    ngOnInit() {
        let hasAccess = false;
        if (this.userStore.authenticated() && this.userRoles) {
            hasAccess = this.userRoles.some(role => this.userStore.hasRole(role));
        }
        if (hasAccess) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

}

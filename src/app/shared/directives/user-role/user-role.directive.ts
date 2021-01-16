import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthImplementService } from '@implements/auth/auth-implement.service';
import { Role } from '@models/auth/role.model';

@Directive({
    selector: '[appUserRole]'
})
export class UserRoleDirective implements OnInit {

    constructor(
        private templateRef: TemplateRef<any>,
        private authService: AuthImplementService,
        private viewContainer: ViewContainerRef
    ) {
    }

    userRoles: Role[];

    @Input()
    set appUserRole(roles: Role[]) {
        if (!roles || !roles.length) {
            throw new Error('Roles value is empty or missed');
        }
        this.userRoles = roles;
    }

    ngOnInit() {
        let hasAccess = false;
        if (this.authService.authenticated() && this.userRoles) {
            hasAccess = this.userRoles.some(role => this.authService.hasRole(role));
        }
        if (hasAccess) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

}

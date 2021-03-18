import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '@parameters/auth/role.parameter';
import { UserStoreService } from '@stores/user-store.service';
import { ROUTER_ACCESS } from '@parameters/router/router-access.parameter';

@Directive({
    selector: '[appRouterAccess]'
})
export class RouterAccessDirective implements OnInit {

    private userRoles: Role[];
    private routerAccess = ROUTER_ACCESS;

    @Input()
    set appRouterAccess(route: string) {
        const roles = this.routerAccess[route] as Role[];
        if (!roles || !roles.length) {
            throw new Error('Router access is empty or missed');
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

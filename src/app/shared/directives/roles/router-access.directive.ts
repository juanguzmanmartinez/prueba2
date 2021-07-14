import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserStoreService } from '@stores/user-store.service';
import { PERMISSIONS } from '@parameters/auth/permissions.parameter';
import { DefaultPermissions } from '@models/auth/permissions.model';

@Directive({
    selector: '[appRouterAccess]'
})
export class RouterAccessDirective implements OnInit {

    private permissions: DefaultPermissions;
    private defaultPermissions = PERMISSIONS;

    @Input()
    set appRouterAccess(route: string) {
        const permissions = this.defaultPermissions[route] as DefaultPermissions;
        if (!permissions) {
            throw new Error('Permission is empty or missed');
        }
        this.permissions = permissions;
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private userStore: UserStoreService,
        private viewContainer: ViewContainerRef
    ) {
    }

    ngOnInit() {
        let hasAccess = this.userStore.hasAccess(this.permissions?.access);
        let access = this.permissions?.access;
        let hasRole = false;

        if (!hasAccess && this.permissions?.parent) {
            const hasParentAccess = this.userStore.hasAccess(this.permissions.parent.access);
            const hasSiblingAccess = !!this.permissions.parent.children
                .find((childrenAccess) => this.userStore.hasAccess(childrenAccess));

            hasAccess = hasParentAccess && !hasSiblingAccess;
            access = hasAccess ? this.permissions.parent.access : access;
        }

        if (!hasAccess && this.permissions?.children) {
            const hasChildrenAccess = this.permissions.children
                .find((children) => this.userStore.hasAccess(children));
            hasAccess = !!hasChildrenAccess;
            access = hasAccess ? hasChildrenAccess : access;
        }

        if (hasAccess) {
            hasRole = this.permissions.roles.some(role => this.userStore.hasAccessByRole(role, access));
        }

        const hasPermissions = hasAccess && hasRole;
        if (hasPermissions) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

}

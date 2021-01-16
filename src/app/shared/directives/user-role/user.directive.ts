import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthImplementService } from '@implements/auth/auth-implement.service';

@Directive({selector: '[appUser]'})
export class UserDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private authService: AuthImplementService,
        private viewContainer: ViewContainerRef
    ) {
    }

    ngOnInit() {
        const hasAccess = this.authService.authenticated();

        if (hasAccess) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

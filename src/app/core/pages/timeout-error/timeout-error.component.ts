import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterHelperService } from '@helpers/router-helper.service';

@Component({
    selector: 'app-timeout-error',
    templateUrl: './timeout-error.component.html',
    styleUrls: ['./timeout-error.component.scss']
})
export class TimeoutErrorComponent implements OnInit {

    @Input() reloadPage: boolean;
    @Input() reloadView = true;
    @Output() customReload = new EventEmitter();

    constructor(
        private _router: Router,
        private _routerHelper: RouterHelperService
    ) {
    }

    ngOnInit(): void {
    }

    tryAgainEvent() {
        this.customReload.emit();
        if (this.reloadPage) {
            this.reloadPageEvent();
        }
        if (this.reloadView) {
            const currentUrl = this._router.url;
            this._routerHelper.reloadRoute(currentUrl);
        }
    }

    reloadPageEvent() {
        window.location.reload();
    }
}

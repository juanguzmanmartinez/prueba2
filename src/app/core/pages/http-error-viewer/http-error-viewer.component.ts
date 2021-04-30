import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HTTP_ERROR } from '@parameters/error/error-code.parameter';

@Component({
    selector: 'app-http-error-viewer',
    templateUrl: './http-error-viewer.component.html',
    styleUrls: ['./http-error-viewer.component.scss']
})
export class HttpErrorViewerComponent implements OnInit {
    public httpError = HTTP_ERROR;

    @Input() errorResponse: HttpErrorResponse;

    @Input() reloadPage: boolean;
    @Input() reloadView = true;
    @Output() customReload = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    get errorStatus(): number {
        return this.errorResponse ? this.errorResponse.status : HTTP_ERROR.genericError.status;
    }
}

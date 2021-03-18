import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-password-validator',
    templateUrl: './password-validator.component.html',
    styleUrls: ['./password-validator.component.scss']
})
export class PasswordValidatorComponent implements OnInit {

    @Input() valid: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

}

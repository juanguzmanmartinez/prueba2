import { Component, OnInit } from '@angular/core';
import { LoginFormService } from './form/login-form.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginFormService]
})
export class LoginComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}

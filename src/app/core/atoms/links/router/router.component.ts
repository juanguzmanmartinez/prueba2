import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-router',
    templateUrl: './router.component.html',
    styleUrls: ['./router.component.sass']
})
export class RouterComponent {
    @Input()
    routerClass: string;

    @Input()
    router: any[] | string;

    @Input()
    routerActive: string[] | string = '';

    @Input()
    routerActiveOptions: { exact: boolean } = {exact: false};

    @Input()
    routerTarget: '_blank' | '_self' | '_parent' | '_top' | 'framename' = '_self';


}

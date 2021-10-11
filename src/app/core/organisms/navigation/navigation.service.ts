import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NavigationService {
    private openSidenavSubject: Subject<boolean> = new Subject<boolean>();
    private closeSidenavSubject: Subject<boolean> = new Subject<boolean>();
    private sidenavOpenedSubject: Subject<boolean> = new Subject<boolean>();
    private sidenavClosedSubject: Subject<boolean> = new Subject<boolean>();

    constructor() {
    }

    get openSidenav$(): Observable<boolean> {
        return this.openSidenavSubject.asObservable();
    }

    set openSidenav(element: boolean) {
        this.openSidenavSubject.next(element);
    }

    get closeSidenav$(): Observable<boolean> {
        return this.closeSidenavSubject.asObservable();
    }

    set closeSidenav(element: boolean) {
        this.closeSidenavSubject.next(element);
    }

    get sidenavOpened$(): Observable<boolean> {
        return this.sidenavOpenedSubject.asObservable();
    }

    set sidenavOpened(element: boolean) {
        this.sidenavOpenedSubject.next(element);
    }

    get sidenavClosed$(): Observable<boolean> {
        return this.sidenavClosedSubject.asObservable();
    }

    set sidenavClosed(element: boolean) {
        this.sidenavClosedSubject.next(element);
    }
}

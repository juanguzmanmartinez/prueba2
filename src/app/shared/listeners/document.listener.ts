import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DocumentListener {
    private clickSubject: Subject<HTMLElement> = new Subject<HTMLElement>();
    private mouseenterSubject: Subject<HTMLElement> = new Subject<HTMLElement>();
    private mouseleaveSubject: Subject<HTMLElement> = new Subject<HTMLElement>();
    private mouseoverSubject: Subject<HTMLElement> = new Subject<HTMLElement>();

    constructor() {
    }

    get click$(): Observable<HTMLElement> {
        return this.clickSubject.asObservable();
    }

    set click(element: HTMLElement) {
        this.clickSubject.next(element);
    }

    get mouseenter$(): Observable<HTMLElement> {
        return this.mouseenterSubject.asObservable();
    }

    set mouseenter(element: HTMLElement) {
        this.mouseenterSubject.next(element);
    }

    get mouseleave$(): Observable<HTMLElement> {
        return this.mouseleaveSubject.asObservable();
    }

    set mouseleave(element: HTMLElement) {
        this.mouseleaveSubject.next(element);
    }

    get mouseover$(): Observable<HTMLElement> {
        return this.mouseoverSubject.asObservable();
    }

    set mouseover(element: HTMLElement) {
        this.mouseoverSubject.next(element);
    }


}

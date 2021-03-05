import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DocumentListener {
    private clickSubject: Subject<HTMLElement> = new Subject<HTMLElement>();

    constructor() {
    }

    get click$(): Observable<HTMLElement> {
        return this.clickSubject.asObservable();
    }

    set click(element: HTMLElement) {
        this.clickSubject.next(element);
    }


}

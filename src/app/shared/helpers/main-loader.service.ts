import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainLoaderService {

  private isLoadedSubject = new BehaviorSubject<boolean>(true);
  public isLoaded$ = this.isLoadedSubject.asObservable();

  constructor() { }

  public set isLoaded(status: boolean) {
    this.isLoadedSubject.next(status);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-error',
  templateUrl: './generic-error.component.html',
  styleUrls: ['./generic-error.component.scss']
})
export class GenericErrorComponent {

  constructor() { }

  reload(): void {
    window.location.reload();
  }

}

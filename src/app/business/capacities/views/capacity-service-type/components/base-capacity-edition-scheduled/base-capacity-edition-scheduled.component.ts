import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-capacity-edition-scheduled',
  templateUrl: './base-capacity-edition-scheduled.component.html',
})
export class BaseCapacityEditionScheduled {
  @Input() drugStoreName: string;
  constructor() {}
}

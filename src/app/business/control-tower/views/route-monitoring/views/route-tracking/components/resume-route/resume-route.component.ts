import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-resume-route',
  templateUrl: './resume-route.component.html',
  styleUrls: ['./resume-route.component.scss'],
})
export class ResumeRouteComponent {
  @Output() redirect = new EventEmitter();

  redirectTo() {
    this.redirect.emit();
  }
}

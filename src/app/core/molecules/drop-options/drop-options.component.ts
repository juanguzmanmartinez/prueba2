import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-options',
  templateUrl: './drop-options.component.html',
  styleUrls: ['./drop-options.component.sass'],
})
export class DropOptionsComponent implements OnInit {
  @Input() innerClass: string;
  @Input() showOptions: boolean;

  constructor() {}

  ngOnInit(): void {}

  //@HostListener('click', ['$event']) clickOut(e: Event) {

  //}
  onBlur() {
    setTimeout(() => {
      this.showOptions = false;
    }, 150);
  }
}

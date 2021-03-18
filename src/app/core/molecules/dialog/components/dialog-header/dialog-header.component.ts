import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html'
})
export class DialogHeaderComponent implements OnInit {

  @Input() iconName: string;

  constructor() { }

  ngOnInit(): void {
  }

}

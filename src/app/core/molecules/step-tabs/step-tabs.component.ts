import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-tabs',
  templateUrl: './step-tabs.component.html',
  styleUrls: ['./step-tabs.component.scss'],
})
export class StepTabsComponent implements OnInit {
  @Input() tabs: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.sass']
})
export class TabComponent implements OnInit {

  @Input() label: string;
  @Input() disabled: boolean;

  @ViewChild('templateRef', {static: true}) templateRef: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

}

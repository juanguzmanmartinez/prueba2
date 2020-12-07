import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-action',
  templateUrl: './card-action.component.html',
  styleUrls: ['./card-action.component.scss']
})
export class CardActionComponent implements OnInit {

  @Input() cardIcon: string;
  constructor() { }

  ngOnInit(): void {
  }

}

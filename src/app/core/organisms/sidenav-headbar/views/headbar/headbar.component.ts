import { Component, OnInit } from '@angular/core';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.sass']
})
export class HeadbarComponent implements OnInit {

  public concatPath = CONCAT_PATH;

  constructor() { }

  ngOnInit(): void {
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {InputComponent} from '../input/input.component';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.sass']
})
export class InputSearchComponent extends InputComponent implements OnInit {

  public inputType = 'search';

  constructor(public _formBuilder: FormBuilder) {
    super(_formBuilder);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}

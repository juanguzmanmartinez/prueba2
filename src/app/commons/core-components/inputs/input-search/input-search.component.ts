import {Component, OnInit, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {InputComponent} from '../input/input.component';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.sass']
})
export class InputSearchComponent extends InputComponent implements OnInit {

  public inputType = 'search';

  constructor(@Self() public ngControl: NgControl) {
    super(ngControl);
    ngControl.valueAccessor = this;
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

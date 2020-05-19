import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-footer-capacity-edition',
  templateUrl: './table-footer-capacity-edition.component.html',
  styleUrls: ['./table-footer-capacity-edition.component.scss']
})
export class TableFooterCapacityEditionComponent implements OnInit {

  @Input()
  quantityTotal: string;


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.quantityTotal = '1000';
  }

  return() {
    this.router.navigate(['/operations-administrator']);
  }
  save() {

  }

}

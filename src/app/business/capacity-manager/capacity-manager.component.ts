import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capacity-manager',
  templateUrl: './capacity-manager.component.html',
  styleUrls: ['./capacity-manager.component.scss']
})
export class CapacityManagerComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  redirect() {
    this.router.navigate(['/capacity-am-pm']);
  }

  redirectExpress() {
    this.router.navigate(['/capacity-express']);
  }

  redirectProgrammed() {
    this.router.navigate(['/capacity-programmed']);
  }
}

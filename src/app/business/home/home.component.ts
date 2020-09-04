import { Component, OnInit } from '@angular/core';
import { MainLoaderService } from 'src/app/shared/helpers/main-loader.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private mainLoaderService: MainLoaderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.mainLoaderService.isLoaded = false;
  }

  redirect() {
    this.router.navigate(['/capacity-manager']);
  }

}

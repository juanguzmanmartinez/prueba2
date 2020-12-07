import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconsComponent} from './icons.component';
import {MatIconModule} from '@angular/material/icon';
import {IconsImplementService} from './service/icons-implement.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule
  ],
  exports: [
    IconsComponent
  ],
  providers: [
    IconsImplementService
  ]
})
export class IconsModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IconsModule } from '../../atoms/icons/icons.module';


@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    IconsModule
  ],
  providers: [
    AlertService
  ]
})
export class AlertModule {
}

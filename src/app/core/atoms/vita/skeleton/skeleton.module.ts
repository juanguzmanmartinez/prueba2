import { NgModule } from '@angular/core';
import { SkeletonTableComponent } from './skeleton.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SkeletonTableComponent],
  imports: [CommonModule],
  exports: [SkeletonTableComponent],
})
export class SkeletonModule {}

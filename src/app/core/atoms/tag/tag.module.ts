import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './views/tag.component';
import { TagDeleteComponent } from '@atoms/tag/views/tag-delete/tag-delete.component';
import { IconsModule } from '@atoms/icons/icons.module';


@NgModule({
  declarations: [
    TagComponent,
    TagDeleteComponent
  ],
  exports: [
    TagComponent,
    TagDeleteComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class TagModule { }

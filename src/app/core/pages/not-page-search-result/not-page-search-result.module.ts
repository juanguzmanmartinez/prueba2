import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { LinksModule } from '@atoms/links/links.module';
import { NotPageSearchResultComponent } from './not-page-search-result.component';

@NgModule({
  declarations: [NotPageSearchResultComponent],
  exports: [NotPageSearchResultComponent],
  imports: [CommonModule, IconsModule],
})
export class NotPageSearchResultModule {}

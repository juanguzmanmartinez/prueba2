import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { LinksModule } from '@atoms/links/links.module';
import { CardModule } from '@molecules/cards/card.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DirectivesModule,
    LinksModule,
    CardModule,
  ],
})
export class HomeModule {}

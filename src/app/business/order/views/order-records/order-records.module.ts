import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';
import { PaginatorModule } from '@atoms/paginator/paginator.module';
import { SelectModule } from '@atoms/select/select.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { BackRouterSimpleModule } from '@molecules/back-router-simple/back-router-simple.module';
import { TableModule } from '@molecules/table/table.module';
import { HttpErrorViewerModule } from '@pages/http-error-viewer/http-error-viewer.module';
import { NotSearchResultModule } from '@pages/not-search-result/not-search-result.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ChannelFilterModule } from './components/channel-filter/channel-filter.module';
import { CompanyFilterModule } from './components/company-filter/company-filter.module';
import { DateFilterModule } from './components/date-filter/date-filter.module';
import { LocalFilterModule } from './components/local-filter/local-filter.module';
import { SearchFilterModule } from './components/search-filter/search-filter.module';
import { ServiceFilterModule } from './components/service-filter/service-filter.module';
import { StatusFilterModule } from './components/status-filter/status-filter.module';
import { OrderRecordsImplementService } from './implements/order-records-implement.service';
import { OrderRecordsRoutingModule } from './order-records-routing.module';
import { OrderRecordsComponent } from './order-records.component';
import { CardModule } from '@molecules/cards/card.module';
import { DirectivesModule } from '../../../../shared/directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [OrderRecordsComponent],
  imports: [
    OrderRecordsRoutingModule,
    ButtonsModule,
    SearchFilterModule,
    LocalFilterModule,
    CompanyFilterModule,
    ServiceFilterModule,
    DateFilterModule,
    StatusFilterModule,
    ChannelFilterModule,
    TableModule,
    MatTableModule,
    MatSortModule,
    MatTableExporterModule,
    CheckboxModule,
    TooltipModule,
    CommonModule,
    PaginatorModule,
    SelectModule,
    FormsModule,
    NotSearchResultModule,
    HttpErrorViewerModule,
    BackRouterSimpleModule,
    CardModule,
    DirectivesModule,
    PipesModule
  ],
  providers: [OrderRecordsImplementService],
})
export class OrderRecordsModule {
}

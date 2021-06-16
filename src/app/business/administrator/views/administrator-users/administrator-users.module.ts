import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorUsersRoutingModule } from './administrator-users-routing.module';
import { AdministratorUsersComponent } from './administrator-users.component';
import { AdministratorUsersHomeComponent } from './views/administrator-users-home/administrator-users-home.component';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { FormFieldModule } from '@molecules/form-field/form-field.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { FormsModule } from '@angular/forms';
import { SelectSearchModule } from '@atoms/select-search/select-search.module';
import { AdministratorUsersImplementService } from './implements/administrator-users-implement.service';
import { ClientsServiceModule } from '@clients/clients-service.module';
import { HttpErrorViewerModule } from '@pages/http-error-viewer/http-error-viewer.module';
import { PaginatorModule } from '@atoms/paginator/paginator.module';
import { TableModule } from '@molecules/table/table.module';
import { NotSearchResultModule } from '@pages/not-search-result/not-search-result.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { TagModule } from '@atoms/tag/tag.module';


@NgModule({
    declarations: [
        AdministratorUsersComponent,
        AdministratorUsersHomeComponent
    ],
    imports: [
        CommonModule,
        AdministratorUsersRoutingModule,
        ButtonsModule,
        FormFieldModule,
        InputsModule,
        FormsModule,
        SelectSearchModule,
        ClientsServiceModule,
        HttpErrorViewerModule,
        PaginatorModule,
        TableModule,
        NotSearchResultModule,
        MatTableModule,
        MatSortModule,
        TooltipModule,
        TagModule
    ],
    providers: [
        AdministratorUsersImplementService
    ]
})
export class AdministratorUsersModule {
}

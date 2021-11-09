import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdministratorUsersImplementService } from '../../implements/administrator-users-implement.service';
import { RegisteredUser } from '../../models/users.model';
import { PaginatorComponent } from '@atoms/paginator/paginator.component';
import { MatSort } from '@angular/material/sort';
import { normalizeValue } from '@helpers/string.helper';
import { SortAlphanumeric, SortString } from '@helpers/sort.helper';
import { CRoleName } from '@parameters/auth/role.parameter';
import { CStateName, CStateTag } from '@models/state/state.model';
import { HttpErrorResponse } from '@angular/common/http';

const ColumnNameList = {
    id: 'id',
    name: 'name',
    lastname: 'lastname',
    position: 'position',
    role: 'role',
    state: 'storeState',
    actions: 'actions',
};

@Component({
    selector: 'app-administrator-users-home',
    templateUrl: './administrator-users-home.component.html',
    styleUrls: ['./administrator-users-home.component.sass']
})
export class AdministratorUsersHomeComponent implements OnInit {

    public roleName = CRoleName;
    public stateTag = CStateTag;
    public stateName = CStateName;
    public columnNameList = ColumnNameList;

    public searchInput = '';
    public usersHomeLoader = true;
    public errorResponse: HttpErrorResponse;
    public displayedColumns: string[] = [
        ColumnNameList.id, ColumnNameList.name, ColumnNameList.lastname,
        ColumnNameList.position, ColumnNameList.role, ColumnNameList.state, ColumnNameList.actions];
    public dataSource = new MatTableDataSource<RegisteredUser>([]);
    @ViewChild(PaginatorComponent) paginator: PaginatorComponent;
    @ViewChild(MatSort) sort: MatSort;
    private registeredUserList: RegisteredUser[];

    constructor(
        private _administratorUsersImplement: AdministratorUsersImplementService
    ) {
    }

    ngOnInit(): void {
        this.getUserList();
    }

    getUserList() {
        this._administratorUsersImplement.userList
            .subscribe((registeredUserList: RegisteredUser[]) => {
                this.registeredUserList = registeredUserList;
                this.settingDataSource();
                this.usersHomeLoader = false;
            }, (error) => {
                this.errorResponse = error;
            });
    }

    settingDataSource() {
        this.dataSource.data = this.registeredUserList;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator.paginator;
        this.dataSource.filterPredicate = (data: RegisteredUser, filter: string) => {
            const filterNormalize = normalizeValue(filter);
            const idNormalize = normalizeValue(data.id);
            const nameNormalize = normalizeValue(data.name);
            const lastnameNormalize = normalizeValue(data.lastname);
            const positionNormalize = normalizeValue(data.position);
            const roleNormalize = normalizeValue(data.permissionList.map(permission => this.roleName[permission.role]).join(''));
            const stateNormalize = normalizeValue(this.stateName[data.state]());
            const valueArray = [idNormalize, nameNormalize, lastnameNormalize, positionNormalize, roleNormalize, stateNormalize];

            const concatValue = normalizeValue(valueArray.join(''));
            const everyValue = valueArray.some(value => value.includes(filterNormalize));
            return concatValue.includes(filterNormalize) && everyValue;
        };

        this.dataSource.sortData = (data: RegisteredUser[], sort: MatSort) => {
            return data.sort((a: RegisteredUser, b: RegisteredUser) => {
                switch (sort.active) {
                    case ColumnNameList.id:
                        return SortAlphanumeric(a.id, b.id, sort.direction);
                    case ColumnNameList.name:
                        return SortAlphanumeric(a.name, b.name, sort.direction);
                    case ColumnNameList.lastname:
                        return SortAlphanumeric(a.lastname, b.lastname, sort.direction);
                    case ColumnNameList.position:
                        return SortString(a.position, b.position, sort.direction);
                    case ColumnNameList.role:
                        const companyListNameA = a.permissionList
                            .map(permission => this.roleName[permission.role]).join('');
                        const companyListNameB = b.permissionList
                            .map(permission => this.roleName[permission.role]).join('');
                        return SortString(companyListNameA, companyListNameB, sort.direction);
                    case ColumnNameList.state:
                        const stateNameA = this.stateName[a.state]();
                        const stateNameB = this.stateName[b.state]();
                        return SortString(stateNameA, stateNameB, sort.direction);
                    default:
                        const defaultA = a[sort.active];
                        const defaultB = b[sort.active];
                        return SortAlphanumeric(defaultA, defaultB, sort.direction);
                }
            });
        };
    }

    filterBySearchInput() {
        this.dataSource.filter = this.searchInput.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editRow(userId: string) {
        // edit userId
    }
}

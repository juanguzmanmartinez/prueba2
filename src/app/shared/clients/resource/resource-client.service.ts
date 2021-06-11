import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyList, ECompany } from '@models/company/company.model';
import { EPaymentMethod, PaymentMethodList } from '@models/payment-method/payment-method.model';

@Injectable()
export class ResourceClientService {

    constructor() {
    }

    getCompanyList(): Observable<ECompany[]> {
        return of(CompanyList);
    }

    getPaymentMethodList(): Observable<EPaymentMethod[]> {
        return of(PaymentMethodList);
    }
}

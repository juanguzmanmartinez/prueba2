export interface IOrderFilter {
  searchCode?: string;
  searchValue?: string;
  locals?: string[];
  companies?: string[];
  typeServices?: string[];
  datePromise?: string[];
  typeDatePromise?: string;
  statusOrder?: string[];
  channelOfBuy?: string[];
  orderCriteria?: { column: string; order: 'A' | 'D' | 'N' };
}

export interface IOrderFilters {
  searchCode: string;
  searchValue: string;
  localId: string[];
  serviceChannel: string[];
  serviceTypeId: string[];
  promiseDate: string[];
  orderStatus: string[];
  companyCode: string[];
}

export interface ITypeSearch {
  code: string;
  icon: string;
  name: string;
  maxLength: string;
  alphanumeric: boolean;
}

export interface IOrderPagination {
  page: number;
  pageSize: number;
}

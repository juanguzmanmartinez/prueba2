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
  orderCriteria?: { column: string, order: 'A' | 'D' | 'N' };
}

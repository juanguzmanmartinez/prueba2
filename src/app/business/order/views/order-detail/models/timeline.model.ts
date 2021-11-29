export class TimelineModel {
  flow: 'done' | 'pending' | 'cancel';
  status: string;
  info: string;
  infoDetail: string;
  date: string;
  name: string;

  constructor(data: any) {
    this.flow = 'done';
    this.status = '';
    this.info = '';
    this.infoDetail = '';
    this.date = '';
    this.name = '';
  }

}

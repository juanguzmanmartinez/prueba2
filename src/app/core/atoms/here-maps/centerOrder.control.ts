import H from '@here/maps-api-for-javascript';

export class CenterOrderControl extends H.ui.Control {
  private iconControl: H.ui.base.Button;
  constructor(centerMap: Function) {
    super();
    this.setAlignment('right-bottom' as H.ui.LayoutAlignment);
    this.iconControl = new H.ui.base.Button({
      label:
        '<svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M13.8003 12.6667V4.66667C13.8003 4.40893 13.5913 4.2 13.3336 4.2H10.187C9.98257 4.2 9.77915 4.17151 9.58259 4.11535L5.275 2.88462C5.2333 2.87271 5.19015 2.86667 5.14679 2.86667H2.66684C2.40911 2.86667 2.20017 3.0756 2.20017 3.33333V11.3333C2.20017 11.5911 2.40911 11.8 2.66684 11.8H5.14679C5.35121 11.8 5.55463 11.8285 5.75118 11.8846L10.0588 13.1154C10.1005 13.1273 10.1436 13.1333 10.187 13.1333H13.3336C13.5913 13.1333 13.8003 12.9244 13.8003 12.6667ZM2.66684 2C1.93046 2 1.3335 2.59695 1.3335 3.33333V11.3333C1.3335 12.0697 1.93046 12.6667 2.66684 12.6667H5.14679C5.27068 12.6667 5.39397 12.6839 5.51309 12.718L9.82069 13.9487C9.93981 13.9827 10.0631 14 10.187 14H13.3336C14.07 14 14.667 13.403 14.667 12.6667V4.66667C14.667 3.93029 14.07 3.33333 13.3336 3.33333H10.187C10.0631 3.33333 9.93981 3.31607 9.82069 3.28203L5.51309 2.0513C5.39397 2.01727 5.27068 2 5.14679 2H2.66684Z" fill="#304165"/>' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M5.3669 12.0784V2.66667H6.23358V12.0784H5.3669Z" fill="#304165"/>' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M9.76701 13.3333V3.92155H10.6337V13.3333H9.76701Z" fill="#304165"/>' +
        '</svg>',
      onStateChange: (evt: any) => {
        if (evt.target.getState() === 'down') {
          centerMap(this.getMap());
        }
      },
    } as H.ui.base.Button.Options);

    this.iconControl.addClass(
      'd-flex justify-content-center align-items-center'
    );

    this.addChild(this.iconControl);
  }
}

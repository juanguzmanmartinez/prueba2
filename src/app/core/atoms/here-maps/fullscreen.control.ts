import H from '@here/maps-api-for-javascript';

export class FullScreenControl extends H.ui.Control {
  mapContainer: any;
  fullScreenButton: H.ui.base.Button;
  constructor(mapContainer) {
    super();
    this.setAlignment('right-top' as H.ui.LayoutAlignment);
    this.mapContainer = mapContainer;
    this.fullScreenButton = new H.ui.base.Button({
      label:
        '<svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M13.8121 2.13299C13.833 2.15107 13.8524 2.1707 13.8703 2.19171C13.902 2.22887 13.9279 2.26928 13.9479 2.31175C13.9813 2.38229 14 2.46116 14 2.54439V5.81776C14 6.11842 13.7563 6.36215 13.4556 6.36215C13.1549 6.36215 12.9112 6.11842 12.9112 5.81776V3.85865L10.0216 6.74826C9.80901 6.96086 9.46431 6.96086 9.25172 6.74826C9.03912 6.53566 9.03912 6.19097 9.25172 5.97837L12.1413 3.08879H10.1822C9.88158 3.08879 9.63785 2.84505 9.63785 2.54439C9.63785 2.24373 9.88158 2 10.1822 2H13.4556C13.5335 2 13.6076 2.01637 13.6747 2.04587C13.7236 2.06736 13.77 2.0964 13.8121 2.13299Z" fill="#304165"/>' +
        '<path d="M2.54439 9.63785C2.84505 9.63785 3.08879 9.88158 3.08879 10.1822V12.1413L5.97837 9.25174C6.19097 9.03914 6.53566 9.03914 6.74826 9.25174C6.96086 9.46434 6.96086 9.80903 6.74826 10.0216L3.85868 12.9112H5.81776C6.11842 12.9112 6.36215 13.1549 6.36215 13.4556C6.36215 13.7563 6.11842 14 5.81776 14H2.54439C2.39465 14 2.25903 13.9395 2.16061 13.8417L2.15945 13.8406L2.1583 13.8394C2.10667 13.7875 2.06768 13.7277 2.04131 13.664C2.01469 13.5998 2 13.5294 2 13.4556V10.1822C2 9.88158 2.24373 9.63785 2.54439 9.63785Z" fill="#304165"/>' +
        '</svg>',
      data: 'idle',
      onStateChange: (evt: any) => {
        if (evt.target.getState() === 'down') {
          if (evt.target.getData() === 'idle') {
            this.mapContainer.requestFullscreen();
            this.fullScreenButton.setData('full');
          } else {
            if (document.fullscreenElement) {
              document.exitFullscreen();
              this.fullScreenButton.setData('idle');
            }
          }
        }
      },
    } as H.ui.base.Button.Options);

    this.fullScreenButton.addClass(
      'd-flex justify-content-center align-items-center'
    );

    this.addChild(this.fullScreenButton);

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this.fullScreenButton.setData('full');
      } else {
        this.fullScreenButton.setData('idle');
      }
    });
  }
}

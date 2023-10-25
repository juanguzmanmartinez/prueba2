import H from '@here/maps-api-for-javascript';

export class MotorizedControl extends H.ui.Control {
  private iconControl: H.ui.base.Button;
  constructor(position: { lat: number; lng: number }) {
    super();
    this.setAlignment('right-bottom' as H.ui.LayoutAlignment);
    this.iconControl = new H.ui.base.Button({
      label:
        '<svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M7.99968 11.1428C9.73543 11.1428 11.1425 9.73574 11.1425 7.99999C11.1425 6.26424 9.73543 4.85713 7.99968 4.85713C6.26393 4.85713 4.85682 6.26424 4.85682 7.99999C4.85682 9.73574 6.26393 11.1428 7.99968 11.1428Z" fill="#304165"/>' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8281 7.49504H14.0709C13.827 4.53776 11.4621 2.17283 8.50489 1.92893V1.17176C8.50489 0.892868 8.27868 0.666656 7.99979 0.666656C7.72091 0.666656 7.4947 0.892868 7.4947 1.17176V1.92893C4.53756 2.17287 2.17261 4.53788 1.92872 7.49504H1.1716C0.892713 7.49504 0.666504 7.72126 0.666504 8.00014C0.666504 8.27903 0.892713 8.50524 1.1716 8.50524H1.92873C2.17268 11.4624 4.53762 13.8273 7.4947 14.0712V14.8282C7.4947 15.1071 7.72091 15.3333 7.99979 15.3333C8.27868 15.3333 8.50489 15.1071 8.50489 14.8282V14.0712C11.462 13.8273 13.8269 11.4624 14.0709 8.50524H14.8281C15.1069 8.50524 15.333 8.27887 15.3332 8.00014C15.3332 7.72125 15.107 7.49504 14.8281 7.49504ZM13.0814 8.00008C13.0814 10.7998 10.8052 13.0781 8.00632 13.0817L7.99979 13.0816L7.99303 13.0817C5.1943 13.078 2.91827 10.7997 2.91827 8.00008C2.91827 5.19821 5.198 2.91849 7.99982 2.91849C10.8017 2.91849 13.0814 5.19821 13.0814 8.00008Z" fill="#304165"/>' +
        '</svg>',
      onStateChange: (evt: any) => {
        if (evt.target.getState() === 'down') {
          this.getMap().setCenter({ lat: position.lat, lng: position.lng });
        }
      },
    } as H.ui.base.Button.Options);

    this.iconControl.addClass(
      'd-flex justify-content-center align-items-center'
    );

    this.addChild(this.iconControl);
  }
}

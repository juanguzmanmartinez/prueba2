### app-radio implementation

1. Para formularios reactivos

  ```typescript
  @Component({
    ...
  })
  export class YourCustomComponent {

    public NAME_OF_YOUR_FORM: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
    ) {
      this.NAME_OF_YOUR_FORM = this.formBuilder.group({
        NAME_OF_YOUR_RADIO_CONTROL: new FormControl()
      });
    }

    public get radioControl() {
      return this.form.get('NAME_OF_YOUR_RADIO_CONTROL') as FormControl;
    }
  }

  /**
   * métodos que se pueden utilizar para este radio
   *
   * Marcar check por defecto:
   * Debes usar el metodo "this.radioControl.setValue('1')"
   * Solo esta permitido pasar valores de tipo "string" o "number"
   *
   * Para saber que valor que se selecciono:
   * Debes subscribirte a "this.radioControl.valueChanges.subscribe(callback)"
   *
   * Para deshabilitar todas las opciones:
   * Debes utilizar el siguiente método "this.radioControl.disable()"
   */


  /**
   * Para deshabilitar sólo una opción debes agregar lo siguiente
   */
  @Component({
    ...
  })
  export class YourCustomComponent {

    // new attribute
    @ViewChildren(CheckboxComponent)
    radioControls: QueryList<CheckboxComponent>;

    public disableOneRadioOption() {
      // this line will disable the radio option
      this.radioControls.toArray()[INDEX_OF_YOUR_OPTION].isDisabled = true;
    }
  }
  ```

  ```html

  <h1>Template</h1>
  <app-radio [radioValue]='true'
             [(ngModel)]="NAME_OF_YOUR_RADIO_MODEL"
             name="NAME_OF_YOUR_RADIO_MODEL">true</app-radio>
  <app-radio [radioValue]='false' 
             [(ngModel)]="NAME_OF_YOUR_RADIO_MODEL" 
             name="NAME_OF_YOUR_RADIO_MODEL">false</app-radio>


  <h1>Reactive</h1>
  <form [formGroup]="NAME_OF_YOUR_FORM">
    <app-radio [radioValue]='true' 
               formControlName="NAME_OF_YOUR_RADIO_CONTROL">true</app-radio>
    <app-radio [radioValue]='false' 
               formControlName="NAME_OF_YOUR_RADIO_CONTROL">false</app-radio>
  </form>

  <!--
    radioValue: es el valor del check seleccionado de tipo "string" o "number"
  -->
  ```

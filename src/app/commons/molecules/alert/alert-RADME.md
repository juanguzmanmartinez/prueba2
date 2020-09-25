# SNACKBAR
  How to use snackbars on your project

## Installation
Import SnackbarModule on your module

  ```typescript
  import { AlertModule } from 'alert.module';

  @NgModule({
    imports: [
      ...
      AlertModule,
      ...
    ],
    ...
  })
  export class YourModule {
  }
  ```

##Usage
Inject the snackbar on you component

  ```typescript
  
import {AlertService} from "alert.service";

export class CartDesktopComponent {

  constructor(
    private  _alertService: AlertService,
  ) {}
}

openAlert(){
  this._alertService.alert('message', {...extraConfig});
}

  ```

  
  ## Documentación
  [Material/snackbar](https://material.angular.io/components/snack-bar/overview)



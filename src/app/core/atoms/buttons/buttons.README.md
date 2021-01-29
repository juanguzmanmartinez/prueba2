Buttons
====================

> Import Buttons Module into your custom module

  ```typescript
import { ButtonsModule } from '@atoms/buttons/buttons.module';

@NgModule({
    imports: [
        ButtonsModule,
    ]
})

export class YourModule {
}
  ```
---
## Usage

> ###Inputs 
> - **innerClass**: string  
> - **inlineStyle**: object  
> - **type**: 'primary' | 'secondary' | 'outline' | 'ghost' | 'default'  
> - **behavior**: 'button' | 'submit' | 'reset'  
> - **disabled**: boolean


  ```html  
    <app-button type="primary" 
                behavior="submit"
                disabled="true"
                (click)="event()"></app-button>
                
    <app-button innerClass="text-white" 
                disabled="false"
                inlineStyle="{backgroundColor: black}"></app-button>
  ```

### Button Icon
> ###Inputs
> - **innerName**: string
> - **innerClass**: string
> - **inlineStyle**: object
> - **type**: 'primary' | 'secondary' | 'outline' | 'ghost' | 'default'
> - **behavior**: 'button' | 'submit' | 'reset'
> - **disabled**: boolean
  ```html  
     <app-button-icon iconName="edit" 
                      (click)="event()" 
                      [disabled]="true"></app-button-action-icon>
                             
     <app-button-icon iconName="launch" 
                      behavior="submit" 
                      innerClass="cursor-pointer"></app-button-action-icon>
  ```

### Button Action Icon

>Accepts only Material Font Icons

> ###Inputs
> - **iconName**: string
> - **iconClass**: string
> - **inlineStyle**: object
> - **disabled**: boolean
  ```html  
     <app-button-action-icon iconName="edit" 
                             (click)="event()" 
                             [disabled]="true"></app-button-action-icon>
                             
     <app-button-action-icon iconName="launch" 
                             [inlineStyle]="{width: '32px', height: '32px'}" 
                             innerClass="cursor-pointer"></app-button-action-icon>
  ```


### Button Action Text

>Accepts only string

> ###Inputs
> - **active**: boolean
> - **iconClass**: string
> - **inlineStyle**: object
> - **disabled**: boolean
  ```html  
     <app-button-action-text (click)="event()" 
                             [active]="true">OP</app-button-action-text>
                             
     <app-button-action-text [inlineStyle]="{width: '32px', height: '32px'}" 
                             innerClass="cursor-pointer">IK</app-button-action-text>
  ```


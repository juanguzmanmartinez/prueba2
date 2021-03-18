# Checkbox

> Import Checkbox Module into your custom module

  ```typescript
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';

@NgModule({
    imports: [
        CheckboxModule,
    ]
})

export class YourModule {
}
  ```

---

  ```typescript
  @Component({
    ...
})
export class YourCustomComponent {
    checked = false;
    indeterminate = false;
    disabled = false;
}
  ```

  ```html

<app-checkbox [(ngModel)]="checked">Checked</app-checkbox>
<app-checkbox [(ngModel)]="indeterminate">Indeterminate</app-checkbox>

<app-checkbox [checked]="checked"
              [disabled]="disabled"
              [indeterminate]="indeterminate">I'm a checkbox
</app-checkbox>
  ```

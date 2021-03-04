## Icons

## File

> Import IconsModule into your custom module

  ```typescript
  import { IconsModule } from '@atoms/icons/icons.module';

@NgModule({
    imports: [
        IconsModule,
    ]
})

export class YourModule {
}
  ```

## How to add new icons

> #### 1.Add icon into directory

  ````
  src/assets/icons/
  ````

> #### 2.Update constants files

  ```
   src/app/core/atoms/icons/constants/icons-svg.ts
  ```

   ````typescript
   const ICONS_SVG = [
    {...},
    {name: 'ICON_NAME', path: `${path}ICON_NAME.svg`},
];
   ````

> #### 3.Update README.md`

Update readme with the new icon name

  ```
   core/atoms/icons/README.md
  ```

### Usage

> HTML

  ```html  
    <app-icon iconSvgWidth="16" iconSvgName="world-marker-colored"></app-icon>
    <app-icon iconSvgWidth="16" iconSvgName="setup-preferences"></app-icon>
    <app-icon iconSvgWidth="56" iconSvgName="setup-preferences"></app-icon>
    <app-icon iconSvgWidth="14" iconSvgName="card-oh-mini"></app-icon>
    <app-icon iconFontSize="16" iconFontName="card-oh-mini"></app-icon>
    <app-icon iconFontSize="24" iconFontName="card-oh-mini"></app-icon>
    <app-icon iconFontSize="32" iconFontName="card-oh-mini"></app-icon>
  ```     

### Icons


### Icons List

| Icon | Name |   |Icon | Name |
|------|------|---|-----|------|
|![](../../../../assets/icons/ampm.svg)             | ampm                  | |      ![](../../../../assets/icons/mifarma.svg)              | mifarma             |
|![](../../../../assets/icons/avatar.svg)           | avatar                | |      ![](../../../../assets/icons/moto.svg)                 | moto                |
|![](../../../../assets/icons/book.svg)             | book                  | |      ![](../../../../assets/icons/navigation.svg)           | navigation          |
|![](../../../../assets/icons/calendar.svg)         | calendar              | |      ![](../../../../assets/icons/stores.svg)               | stores              |
|![](../../../../assets/icons/configuration.svg)    | configuration         | |      ![](../../../../assets/icons/truck.svg)                | truck               |
|![](../../../../assets/icons/inkafarma.svg)        | inkafarma             | |      ![](../../../../assets/icons/search.svg)               | search              |
|![](../../../../assets/icons/main-logo.svg)        | main-logo             | |      ![](../../../../assets/icons/datepicker.svg)           | datepicker          |
|![](../../../../assets/icons/ellipse-success.svg)  | ellipse-success       | |      ![](../../../../assets/icons/ellipse-disabled.svg)     | ellipse-disabled    |
|![](../../../../assets/icons/loader.svg)           | loader                | |           |               |

<br/>

### Illustrations List
|Illustration | Name |   | Illustration | Name |
|-------------|------|---|--------------|------|
|![](../../../../assets/illustrations/assigned-orders.svg)      | assigned-orders       | |      ![](../../../../assets/illustrations/lost-connection.svg)       | lost-connection       |
|![](../../../../assets/illustrations/call-attention.svg)       | call-attention        | |      ![](../../../../assets/illustrations/lost-connection-1.svg)     | lost-connection-1     |
|![](../../../../assets/illustrations/communication.svg)        | communication         | |      ![](../../../../assets/illustrations/on-route.svg)              | on-route              |
|![](../../../../assets/illustrations/empty-orders-1.svg)       | empty-orders-1        | |      ![](../../../../assets/illustrations/order-canceled.svg)        | order-canceled        |
|![](../../../../assets/illustrations/empty-orders.svg)         | empty-orders          | |      ![](../../../../assets/illustrations/order-updated.svg)         | order-updated         |
|![](../../../../assets/illustrations/gps.svg)                  | gps                   | |      ![](../../../../assets/illustrations/payment.svg)               | payment               |
|![](../../../../assets/illustrations/login.svg)                | login                 | |      ![](../../../../assets/illustrations/send-message.svg)          | send-message          |
|![](../../../../assets/illustrations/look-orders.svg)          | look-orders           | |      ![](../../../../assets/illustrations/sent.svg)                  | sent                  |
|![](../../../../assets/illustrations/looking-files.svg)        | looking-files         | |      ![](../../../../assets/illustrations/under-construction.svg)    | under-construction    |
|![](../../../../assets/illustrations/search-store.svg)         | search-store          | |      ![](../../../../assets/illustrations/logo.svg)                  | logo                  |



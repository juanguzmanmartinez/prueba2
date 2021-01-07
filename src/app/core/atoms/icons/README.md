## Icons

## File

> Import IconsModule into your custom module

  ```typescript
  import { IconsModule } from '@atoms/icons/icons.module';

@NgModule({
  imports: [
    ...,
  IconsModule,
]
})

export class YourModule {
}
  ```

## How to add new icons

> #### 1.Add icon into directory

  ````
  ../assets/icons/
  ````

> #### 2.Update constants files

  ```
   ./core/atoms/icons/constants/icons-svg.ts
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

> 14

name | icon
  -----|-----
![](src/assets/icons/ampm.svg) | ampm
![](src/assets/icons/avatar.svg) | avatar
![](src/assets/icons/book.svg) | book
![](src/assets/icons/calendar.svg) | calendar
![](src/assets/icons/configuration.svg) | configuration
![](src/assets/icons/inkafarma.svg) | inkafarma
![](src/assets/icons/main-logo.svg) | main-logo
![](src/assets/icons/mifarma.svg) | mifarma
![](src/assets/icons/moto.svg) | moto
![](src/assets/icons/navigation.svg) | navigation
![](src/assets/icons/stores.svg) | stores
![](src/assets/icons/truck.svg) | truck
![](src/assets/icons/search.svg) | search
![](src/assets/icons/datepicker.svg) | datepicker
![](src/assets/icons/logo.svg) | logo
---------------------------------------|---------------------------
![](src/assets/illustrations/assigned-orders.svg) | assigned-orders
![](src/assets/illustrations/empty-orders-1.svg) | empty-orders-1
![](src/assets/illustrations/empty-orders.svg) | empty-orders
![](src/assets/illustrations/login.svg) | login
![](src/assets/illustrations/look-orders.svg) | look-orders
![](src/assets/illustrations/on-route.svg) | on-route
![](src/assets/illustrations/order-canceled.svg) | order-canceled
![](src/assets/illustrations/order-updated.svg) | order-updated
![](src/assets/illustrations/search-store.svg) | search-store
![](src/assets/illustrations/under-construction.svg) | under-construction

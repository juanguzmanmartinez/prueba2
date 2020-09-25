## Icons
  ## File
  > Import IconsModule into your custom module
  ```typescript
  import { IconsModule } from 'src/app/core/generic/icons/icons.module';
  
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
  >####1.Add icon into directory
  
  ````
  ../assets/icons/
  ````
  
  
   >####2.Update constants files
   
  ```
   ./core/generic/icons/constants/icons-svg.ts
  ```
   
   ````typescript
   const ICONS_SVG = [
     {...},
     {name: 'ICON_NAME', path: `${path}ICON_NAME.svg`},
   ];
   ````
       
   >####3.Update README.md`
   
   Update readme with the new icon name
  ```
   core/generic/icons/README.md
  ```
  
    
  ### Usage
  >HTML
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
  
  >14
  
  name | icon
  -----|-----
  ![](../../../../assets/icons/ampm.svg) | ampm
  ![](../../../../assets/icons/avatar.svg) | avatar
  ![](../../../../assets/icons/book.svg) | book
  ![](../../../../assets/icons/calendar.svg) | calendar
  ![](../../../../assets/icons/configuration.svg) | configuration
  ![](../../../../assets/icons/inkafarma.svg) | inkafarma
  ![](../../../../assets/icons/main-logo.svg) | main-logo
  ![](../../../../assets/icons/mifarma.svg) | mifarma
  ![](../../../../assets/icons/moto.svg) | moto
  ![](../../../../assets/icons/navigation.svg) | navigation
  ![](../../../../assets/icons/stores.svg) | stores
  ![](../../../../assets/icons/truck.svg) | truck
  ![](../../../../assets/icons/search.svg) | search
  ![](../../../../assets/icons/datepicker.svg) | datepicker
  ---------------------------------------|---------------------------
  ![](../../../../assets/illustrations/assigned-orders.svg) | assigned-orders
  ![](../../../../assets/illustrations/empty-orders-1.svg) | empty-orders-1
  ![](../../../../assets/illustrations/empty-orders.svg) | empty-orders
  ![](../../../../assets/illustrations/login.svg) | login
  ![](../../../../assets/illustrations/look-orders.svg) | look-orders
  ![](../../../../assets/illustrations/on-route.svg) | on-route
  ![](../../../../assets/illustrations/order-canceled.svg) | order-canceled
  ![](../../../../assets/illustrations/order-updated.svg) | order-updated
  ![](../../../../assets/illustrations/search-store.svg) | search-store

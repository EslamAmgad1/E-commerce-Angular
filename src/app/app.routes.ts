import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ShopComponent } from './shop/shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';

export const routes: Routes = [
  {path: '' , component: HomeComponent},

  {path: 'Shop' , loadComponent: () =>
    import('./shop/shop/shop.component')
        .then(c => c.ShopComponent)
  },
  {path: 'Shop/:id' , loadComponent: () =>
    import('./shop/product-details/product-details.component')
        .then(c => c.ProductDetailsComponent)
  },
  {path: '**' , redirectTo:'' , pathMatch:'full' }
];

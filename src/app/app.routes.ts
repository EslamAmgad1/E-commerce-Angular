import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ShopComponent } from './shop/shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

export const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'test-error' , component: TestErrorComponent},
  {path: 'not-found' , component: NotFoundComponent},
  {path: 'server-error' , component: ServerErrorComponent},
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

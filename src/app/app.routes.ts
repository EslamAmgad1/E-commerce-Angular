import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { BasketComponent } from './basket/basket.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'test-error' , component: TestErrorComponent},
  {path: 'not-found' , component: NotFoundComponent},
  {path: 'server-error' , component: ServerErrorComponent},
  {path: 'shop', loadChildren: () => import('./shop/shop.routes').then(m => m.Shoproutes)},
  {path: 'checkout', loadChildren: () => import('./checkout/checkout.routes').then(r => r.Checkoutroutes )},
  {path: 'basket' , loadComponent : () => import('./basket/basket.component').then(c=>c.BasketComponent) },
  {path: '**' , redirectTo:'' , pathMatch:'full' }
];

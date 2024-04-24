import { Routes } from "@angular/router";
import { ShopComponent } from "./shop/shop.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

export const Shoproutes: Routes = [
  {path: '', component: ShopComponent},
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}},
];

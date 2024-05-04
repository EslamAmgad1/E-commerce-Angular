import { Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout/checkout.component";
import { CheckoutSuccessComponent } from "./checkout-success/checkout-success.component";


export const Checkoutroutes: Routes = [
  {path: '', component: CheckoutComponent},
  {path: 'success', component: CheckoutSuccessComponent},
];

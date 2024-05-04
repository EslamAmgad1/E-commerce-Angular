import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Basket } from '../../shared/models/basket';
import { firstValueFrom } from 'rxjs';
import { OrderToCreate } from '../../shared/models/order';
import { Address } from '../../shared/models/user';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CdkStepperModule,CommonModule,ReactiveFormsModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;
  constructor(private basketService: BasketService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router) {}
    async submitOrder() {
      const basket = this.basketService.getCurrentBasketValue();
      if (!basket) throw new Error('cannot get basket');
      const createdOrder = await this.createOrder(basket);
      this.basketService.deleteBasket(basket);
      const navigationExtras: NavigationExtras = {state: createdOrder};
      this.router.navigate(['checkout/success'], navigationExtras);
    }
    private async createOrder(basket: Basket | null) {
      if (!basket) throw new Error('Basket is null');
      const orderToCreate = this.getOrderToCreate(basket);
      return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
    }

    private getOrderToCreate(basket: Basket): OrderToCreate {
      const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
      const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;
      if (!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');
      return {
        basketId: basket.id,
        deliveryMethodId: deliveryMethodId,
        shipToAddress: shipToAddress
      }
    }
  }

import { Component, OnInit } from '@angular/core';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from '../checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from '../checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from '../checkout-review/checkout-review.component';
import { OrderTotalsComponent } from '../../shared/order-totals/order-totals.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [StepperComponent,
            CdkStepperModule ,
            CheckoutAddressComponent,
            CheckoutDeliveryComponent,
            CheckoutPaymentComponent,
            CheckoutReviewComponent,
            OrderTotalsComponent,
            CdkStepperModule
          ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',

})
export class CheckoutComponent implements OnInit {

  constructor(private fb: FormBuilder, private accountService: AccountService,
    private basketService: BasketService) { }

  ngOnInit(): void {
    this.getAddressFormValues();
    this.getDeliveryMethodValue();
  }

  checkoutForm = this.fb.group({
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    }),
    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required]
    }),
    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required]
    })
  })

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: address => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address)
      }
    })
  }

  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket && basket.deliveryMethodId) {
      this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')
        ?.patchValue(basket.deliveryMethodId.toString());
    }
  }

}

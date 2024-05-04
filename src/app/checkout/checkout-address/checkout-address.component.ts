import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [CommonModule,TextInputComponent,ReactiveFormsModule,CdkStepperModule ,RouterModule],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss',

})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkoutForm?.get('addressForm')?.value).subscribe({
      next: () => {
        this.toastr.success('Address saved');
        this.checkoutForm?.get('addressForm')?.reset(this.checkoutForm?.get('addressForm')?.value);
      }
    })
  }
}

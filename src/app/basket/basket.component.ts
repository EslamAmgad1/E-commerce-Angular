import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { CommonModule } from '@angular/common';
import { BasketItem } from '../shared/models/basket';
import { RouterModule } from '@angular/router';
import { OrderTotalsComponent } from '../shared/order-totals/order-totals.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule,RouterModule,OrderTotalsComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})

export class BasketComponent {

  constructor(public basketService: BasketService){}

  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(id: number,quantity : number) {
    this.basketService.removeItemFromBasket(id,quantity);
  }

}

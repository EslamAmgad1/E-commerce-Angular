import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop/shop.component';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BasketService } from './basket/basket.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,NavBarComponent,ShopComponent,SectionHeaderComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'E-commerceApp';
  constructor(private basketService: BasketService){}
  ngOnInit(): void {
    this.loadBasket();
  }
  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) this.basketService.getBasket(basketId);
  }

}

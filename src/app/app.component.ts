import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop/shop.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,NavBarComponent,ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'E-commerceApp';
  constructor(){}
  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { Pagination } from './models/pagination';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,NavBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'E-commerceApp';
  products : Product[] = [] ;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get<Pagination<Product[]>>("https://localhost:7149/api/products").subscribe(
      (response) => this.products=response.data
    )
  }
}

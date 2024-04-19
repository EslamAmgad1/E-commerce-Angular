import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Brand } from '../../shared/models/brand';
import { Type } from '../../shared/models/type';
import { FormsModule } from '@angular/forms';
import { ShopParams } from '../../shared/models/shopParams';
import { PagingHeaderComponent } from '../../shared/paging-header/paging-header.component';
import { PagerComponent } from '../../shared/pager/pager.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,
            ProductItemComponent,
            FormsModule ,
            PagingHeaderComponent ,
            PagerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new ShopParams();
  @ViewChild('search') search? : ElementRef ;
  sortOptions = [
    {name : 'Alphabetical' , value : 'name'},
    {name : 'Price: Low to high' , value : 'priceAsc'},
    {name : 'Price: High to low' , value : 'priceDesc'},
  ]
  totalCount = 0 ;
  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts() {
    this.shopService
      .getProducts(this.shopParams)
      .subscribe({
        next: (response) => {
                this.products = response.data;
                this.shopParams.pageSize = response.pageSize;
                this.shopParams.pageIndex = response.pageIndex;
                this.totalCount = response.count;
              },
        error: (error) => console.log(error),
      });
  }
  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => (this.brands = [{ id:0 , name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = [{ id:0 , name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }
  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageIndex = 1 ;
    this.getProducts();
  }
  onSortSelected(event : any){
    this.shopParams.sort = event.target.value ;
    this.shopParams.pageIndex = 1 ;
    this.getProducts();
  }
  onPageChanged(event:any){
    if(this.shopParams.pageIndex !== event){
      this.shopParams.pageIndex = event ;
      this.getProducts();
    }
  }
  onsearch(){
    this.shopParams.search = this.search?.nativeElement.value;
    this.shopParams.pageIndex = 1 ;
    this.getProducts();
  }
  onReset(){
    if(this.search) this.search.nativeElement.value = '' ;
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}

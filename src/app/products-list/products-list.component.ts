import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../services/product/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products : Product[];

  constructor( private productService : ProductService ) { 
    this.products = [];
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe( products => this.products = products );
  }

  share(event : Event) : void{
    event.stopPropagation();
    window.alert('The product was shared');
  }

  Notify(productName : string) : void{
    window.alert('You will be notified when '+productName + ' goes on sale')
  }
}

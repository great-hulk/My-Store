import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],

})
export class TopBarComponent implements OnInit{

    cartProducts : Number = 0;

    constructor( private cartService : CartService ){}
    ngOnInit(){
      this.cartService.getProductCount().subscribe(
        nofProducts => this.cartProducts = nofProducts
      )
    }

    navigationLinks = [
      { label : 'Home' , url : '/home' },
      { label : 'Products' , url : '/products' },
      { label : 'Shopping Cart' , url : '/cart' },
      { label : 'Shipments' , url : '/shipments' }
    ]
}

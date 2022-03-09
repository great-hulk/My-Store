import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { CartProduct, Product } from '../services/product/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  products : Array<CartProduct> = [];
  shippingOptions : any = [];
  cartPrice : number = 0;

  constructor( private cartService : CartService ){
      this.cartService.getShippingOptions().subscribe(shippingOptions => {
        this.shippingOptions = shippingOptions
      });
      this.cartPrice = this.cartService.getCartPrice();
   }

  ngOnInit(): void {
    this.products = this.cartService.getCartProducts();
  }

  changeQuantity(event : Event , productId : number) : void{
    event.preventDefault();
    let quantity = (event.target as any).value;
    if( quantity > 5 ){
      window.alert('You cannot order more than 5 quantity of same item');
      (event.target as any ).value = 5;
      return;
    }
    if( quantity == 0 ){
      this.removeFromCart(productId);
      return;
    }
    this.cartService.editProductQuantity(productId,  quantity);
    this.products = this.cartService.getCartProducts();
    this.calculateCartPrice();
  }

  changeShipping( event : Event ,  productId : number ) : void{
    this.cartService.changeShipping( productId , parseInt((event.target as any).value) );
    this.products = this.cartService.getCartProducts();
    this.calculateCartPrice();
  }

  removeFromCart(productId : number) : void{
    this.cartService.removeFromCart(productId);
    this.products = this.cartService.getCartProducts();
    this.calculateCartPrice();
  }

  calculateCartPrice():void{
    this.cartPrice = this.cartService.getCartPrice();
  }

  clearCart() : void{
    this.cartService.clearCart();
    this.products = this.cartService.getCartProducts();
  }

}

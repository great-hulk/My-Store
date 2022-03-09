import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../services/product/product.model';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent{

  product : Product | undefined = { id : -1, name : '', price : -1 };
  alreadyInCart : boolean = false;

  constructor( private route : ActivatedRoute , private productService : ProductService , private cartService : CartService ){
    const productId : number = parseInt(this.route.snapshot.paramMap.get('productId') as string);
    let allProducts : Array<Product>;
    this.productService.getProducts().subscribe( products => {
      allProducts = products;
      this.product = allProducts.find(product => product.id == productId);

      if(this.cartService.getCartProducts().find(product => this.product && product.name === this.product.name) ){
          this.alreadyInCart = true;
      }

    });
  }

  addToCart() : void{
    if( this.product ){
      if( !this.alreadyInCart ){
        this.cartService.addToCart({...this.product , quantity : 1 });
        window.alert('The product was added to the cart');
      }else{
        this.cartService.removeFromCart(this.product.id);
        window.alert('The product was removed from the cart')
      }
      this.alreadyInCart = !this.alreadyInCart;
    }
  }

}

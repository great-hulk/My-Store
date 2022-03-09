import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart/cart.service';
import { CartProduct } from '../services/product/product.model';
import { ShipmentService } from '../services/shipment/shipment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent{

  products : Array<CartProduct> = []
  shippingOptions : Array<{ name:string , price : number}> = []
  contactAdded : boolean = false;
  paymentAdded : boolean = false;
  cartPrice : Number = 0;

  contactForm : FormGroup = new FormGroup(
    {
      Name : new FormControl('' , Validators.required),
      Email : new FormControl('' , [Validators.email , Validators.required]),
      Mobile : new FormControl('' , [Validators.required , Validators.pattern(/^(\+[0-9]{2}){0,1}[0-9]{10}$/)]),
      Address : new FormControl('' , Validators.required)
    }
  )

  paymentForm : FormGroup = new FormGroup(
    {
      CardNumber : new FormControl('',[Validators.minLength(16), Validators.maxLength(16) , Validators.required]),
      CVV : new FormControl('' , [Validators.required , Validators.pattern(/^[0-9]{3}$/)]),
      Name : new FormControl('' , Validators.required)
    }
  )

  constructor( private cartService : CartService , private shipmentService : ShipmentService ){
    this.products = this.cartService.getCartProducts();
    this.cartService.getShippingOptions().subscribe(shippingOptions => this.shippingOptions = shippingOptions);
    this.cartPrice = this.cartService.getCartPrice();
  }

  onSubmit() : void{
    if(this.contactForm.valid ){
      this.contactAdded = true;
    }else{
      return;
    }
    if( this.paymentForm.valid ){
      this.paymentAdded = true;
    }else{
      return
    }
    this.shipmentService.addShipment({ products : this.products , contact : this.contactForm.value , payment : this.paymentForm.value })
  }
}

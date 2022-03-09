import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CartProduct, Product } from "../product/product.model";

@Injectable({ providedIn : 'root' })
export class CartService{
    products : Array<CartProduct> = []
    shippingOptions : Array<{ name : string, price : number }> = [];

    constructor( private http : HttpClient ){}

    addToCart( product : CartProduct ):void{
        this.products.push(product);
    }
    removeFromCart( id : number ):void{
        this.products = this.products.filter((product , index) => product.id!==id);
        // console.log(this.products);
    }
    getCartProducts():Array<Product>{
        return this.products;
    }
    getNoOfProducts() : Observable<Number>{
        const productsObservable = new Observable<Number>( observer => {
            setInterval(()=>{
                observer.next(this.products.length);
            },1000);
        })
        return productsObservable;
    }
    editProductQuantity( productId : number , quantity : number ):void{
        for( let product of this.products ){
            if( product.id == productId ){
                product.quantity = quantity;
            }
        }
    }
    getShippingOptions() : Observable<Array<{ name : string , price : number }>>{
        const shippingOptions =  this.http.get<Array<{ name : string , price : number }>>('../../../assets/shipping-prices.json');
        shippingOptions.subscribe( shippingOptions => this.shippingOptions = shippingOptions );
        return shippingOptions;
    } 
    changeShipping( productId : number , shippingId : number ){
        for( let product of this.products ){
            if( product.id == productId ){
                product.shipping = shippingId;
            }
        }
    }
    getCartPrice():number{
        let cartPrice = 0;
        for( let product of this.products ){
            cartPrice = cartPrice + product.price*(product.quantity || 0);
            if( this.shippingOptions.length > 0 ){
                cartPrice = cartPrice + parseInt((this.shippingOptions[product.shipping || 0].price as any) as string);
            }
        }
        return cartPrice;
    }
    clearCart():void{
        this.products = [];
    }
}
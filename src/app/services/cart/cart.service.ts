import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CartProduct } from "src/app/interfaces/cart-product";

@Injectable({ providedIn : 'root' })
export class CartService{
    products : Array<CartProduct> = []
    shippingOptions : Array<{ name : string, price : number }> = [];

    constructor( private http : HttpClient ){}

    addToCart( product : CartProduct ):boolean{
        this.products.push(product);
        return true;
    }
    removeFromCart( id : number ):boolean{
        const product = this.products.find( product => product.id == id && !product.isDeleted );
        if( product ){
            product.isDeleted = true;
            return true;
        }
        return false;
        // console.log(this.products);
    }
    getCartProducts():Array<CartProduct>{
        const products : Array<CartProduct> = this.products.filter( product => !product.isDeleted );
        return products;
    }
    getProductCount() : Observable<Number>{
        const productsObservable = new Observable<Number>( observer => {
            setInterval(()=>{
                let productCount = 0;
                for( let product of this.products ){
                    if( !product.isDeleted ){
                        productCount++;
                    }
                }
                observer.next(productCount);
            },1000);
        })
        return productsObservable;
    }
    editProductQuantity( productId : number , quantity : number ):boolean{
        const product : CartProduct | undefined = this.products.find( product => product.id == productId && !product.isDeleted );
        if( product ){
            product.quantity = quantity;
            return true;
        }
        return false;
    }
    getShippingOptions() : Observable<Array<{ name : string , price : number }>>{
        const shippingOptions =  this.http.get<Array<{ name : string , price : number }>>('../../../assets/shipping-prices.json');
        shippingOptions.subscribe( shippingOptions => this.shippingOptions = shippingOptions );
        return shippingOptions;
    } 
    changeShipping( productId : number , shippingId : number ):boolean{
        const product : CartProduct | undefined = this.products.find( product => product.id == productId && !product.isDeleted );
        if( product ){
            product.shipping = shippingId;
            return true;
        } 
        return false;
    }
    getCartPrice():number{
        let cartPrice = 0;
        for( let product of this.products ){
            if( product.isDeleted ){
                continue;
            }
            cartPrice = cartPrice + product.price*(product.quantity || 0);
            if( this.shippingOptions.length > 0 ){
                cartPrice = cartPrice + parseInt((this.shippingOptions[product.shipping || 0].price as any) as string);
            }
        }
        return cartPrice;
    }
    clearCart():boolean{
        for( let product of this.products ){
            product.isDeleted = true;
        }
        return true;
    }
}
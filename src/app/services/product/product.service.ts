import { Injectable } from "@angular/core";
import { Product } from "src/app/interfaces/product";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn : 'root' })
export class ProductService{
    products : Array<Product>;
    
    constructor( private http : HttpClient ){
        this.products = [];
    }
    
    getProducts():Observable<Product[]>{
        return this.http.get<Product[]>('../../assets/products.json');
    }

    setProducts( products : Array<Product> = [] ):void{
        this.products = products;
    }

    addProduct( product : Product ) : void{
        this.products.push(product);
    }

}
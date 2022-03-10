import { CartProduct } from "./cart-product"
export interface Shipment{
    products : Array<CartProduct>,
    contact : {
        Name : string,
        Email : string,
        Mobile : string,
        Address : string
    },
    payment : {
        CardNumber : string,
        CVV : string, 
        Name : string
    }
}
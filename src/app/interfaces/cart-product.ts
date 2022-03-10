import { Product } from "./product"
export interface CartProduct extends Product{
    quantity? : number,
    shipping? : number,
    isDeleted? : boolean
}
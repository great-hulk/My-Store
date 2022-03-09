export interface Product{
    id : number,
    name : string,
    price : number,
    description? : string,
}

export interface CartProduct extends Product{
    quantity? : number,
    shipping? : number
}
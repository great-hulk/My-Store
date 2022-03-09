import { Injectable } from "@angular/core";
import { CartProduct, Product } from "../product/product.model";

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

@Injectable({ providedIn : 'root' })
export class ShipmentService{
    shipments : Array<Shipment> = [];

    addShipment( shipment : Shipment ):void{
        this.shipments.push(shipment);
        // console.log(shipment);
    }

    getAllShipments() : Array<Shipment>{
        return this.shipments;
    }
}
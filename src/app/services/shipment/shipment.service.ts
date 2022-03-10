import { Injectable } from "@angular/core";
import { Shipment } from "src/app/interfaces/shipment";


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
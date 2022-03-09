import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Shipment, ShipmentService } from '../services/shipment/shipment.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent{

  shipments : Array<Shipment> = [];
  shippingOptions : Array<{ name : string , price : number }>  = []

  constructor( private shipmentService : ShipmentService , private cartService : CartService  ) {
    this.shipments = this.shipmentService.getAllShipments();
    this.cartService.getShippingOptions().subscribe(shippingOptions => this.shippingOptions = shippingOptions)
  }

}

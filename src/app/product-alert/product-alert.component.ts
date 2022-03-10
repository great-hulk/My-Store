import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product';
@Component({
  selector: 'app-product-alert',
  templateUrl: './product-alert.component.html',
  styleUrls: ['./product-alert.component.css']
})
export class ProductAlertComponent{

  @Input() product : Product;
  @Output() notify = new EventEmitter<string>();

  constructor(){
    this.product = { id : -1 ,name : '' , price : -1 }
  }

  Notify(event : Event) : void{
    event.stopPropagation();
    this.notify.emit(this.product.name);
  }

}

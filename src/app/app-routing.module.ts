import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ShipmentComponent } from './shipment/shipment.component';

const routes: Routes = [
  { path : '' , redirectTo :'home' , pathMatch : 'full' },
  { path : 'home' , component : HomeComponent },
  { path : 'products' , component : ProductsListComponent },
  { path : 'product/:productId' , component : ProductDetailsComponent },
  { path : 'cart' , component : CartComponent },
  { path : 'checkout' , component : CheckoutComponent },
  { path : 'shipments' , component : ShipmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

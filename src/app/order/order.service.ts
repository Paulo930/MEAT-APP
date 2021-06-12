import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

import { ShoppigCartService } from "../restaurant-detail/shopping-cart/shoping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Order, OrderItem } from "./order.model";
import { MEAT_API } from "../app.api";

@Injectable()
export class OrderService {
  constructor(
    private cartSevice: ShoppigCartService,
    private http: HttpClient
  ) {}

  itemsValue(): number {
    return this.cartSevice.total();
  }

  cartItem(): CartItem[] {
    return this.cartSevice.items;
  }

  increaseQty(item: CartItem) {
    this.cartSevice.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartSevice.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartSevice.removeItem(item);
  }

  checkOrder(order: Order): Observable<string> {
    return this.http.post<Order>(`${MEAT_API}/orders`, order)
      .map((order) => order.id);
  }

  clear() {
    this.cartSevice.clear();
  }
}

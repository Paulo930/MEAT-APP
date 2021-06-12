import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";

import { ShoppigCartService } from "./shoping-cart.service";

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row', [
      state('ready', style({opacety: 1})),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({opecity:0, transform: 'translateX(-30px)', offset:0}),
        style({ opecity: 0.8, transform: 'translateX(-10px)', offset: 0.8 }),
        style({ opecity: 1, transform: 'translateX(0px)', offset: 1 }),
      ]))),
      transition('ready => void', animate('300ms 0s ease-in', keyframes([
        style({ opecity: 1, transform: 'translateX(0px)', offset: 0 }),
        style({ opecity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
        style({ opecity: 0, transform: 'translateX(30px)', offset: 1 }),
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready'

  constructor(
    private shoppingCartService: ShoppigCartService
    ) { }

  ngOnInit() {
  }

  item(): any[] {
    return this.shoppingCartService.items;
  }

  clear() {
    this.shoppingCartService.clear()
  }

  removeItem(item: any){
    this.shoppingCartService.removeItem(item)
  }

  addItem(item: any){
    this.shoppingCartService.addItem(item)
  }

  total(): number{
    return this.shoppingCartService.total()
  }

}

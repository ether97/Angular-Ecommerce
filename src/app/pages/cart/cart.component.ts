import { Component, OnInit } from "@angular/core";
import * as e from "express";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "./../../services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "sneakers",
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "shoes",
        price: 130,
        quantity: 2,
        id: 2,
      },
    ],
  };

  dataSource: Array<CartItem> = [];

  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.CartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  constructor(private CartService: CartService) {}

  getTotal(items: Array<CartItem>): number {
    return this.CartService.getTotal(items);
  }

  removeItems(): void {
    this.CartService.clearCart();
  }

  removeItemFromCart(item: CartItem): void {
    this.CartService.removeItemFromCart(item);
  }

  changeQuantity(item: CartItem, action: string) {
    this.CartService.changeQuantity(item, action);
  }
}

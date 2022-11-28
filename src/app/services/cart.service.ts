import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("1 item added to cart.", "OK", { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart is cleared.", "OK", { duration: 3000 });
  }

  removeItemFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open("Item removed from cart.", "OK", { duration: 3000 });
    }

    return filteredItems;
  }

  changeQuantity(item: CartItem, action: string) {
    let items = [...this.cart.value.items];
    const itemFound = items.find((_item) => _item.id === item.id);
    if (itemFound) {
      if (itemFound.quantity >= 1) {
        if (action === "add") {
          itemFound.quantity += 1;
        } else {
          itemFound.quantity -= 1;
        }
      } else {
        items = this.removeItemFromCart(itemFound, false);
      }
    }

    this.cart.next({ items });
  }
}

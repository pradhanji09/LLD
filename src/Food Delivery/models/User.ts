import { Cart } from "./Cart.js";

export class User {
  private static currentId = 0;
  private id: number;
  private name: string;
  private cart: Cart;

  constructor(name: string) {
    User.currentId++;
    this.id = User.currentId;
    this.name = name;
    this.cart = new Cart();
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getCart(): Cart {
    return this.cart;
  }
}

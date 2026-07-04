import { Cart } from "./Cart.js";

export class User {
  private static currentId = 0;
  private id: number;
  private name: string;
  private cart: Cart;
  private address: string;

  constructor(name: string) {
    User.currentId++;
    this.id = User.currentId;
    this.name = name;
    this.cart = new Cart();
    this.address = "";
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

  setAddress(add: string): void {
    this.address = add;
  }

  getAddress(): string {
    return this.address;
  }
}

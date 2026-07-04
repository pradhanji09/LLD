import type { Item } from "./Item.js";
import type { Restaurant } from "./Resturant.js";

export class Cart {
  private items: Item[] = [];
  private restaurant: Restaurant | null;
  private total: number = 0;

  constructor() {
    this.restaurant = null;
  }

  getItems(): Item[] {
    return this.items;
  }

  getTotal(): number {
    return this.total;
  }

  addItem(item: Item): void {
    if (!this.restaurant) throw Error("Set Restaurant First");
    this.total += item.getPrice();
    this.items.push(item);
  }

  clearCart() {
    this.items = [];
    this.total = 0;
  }

  setRestaurant(res: Restaurant) {
    this.restaurant = res;
  }

  getRestaurant(): Restaurant | null {
    return this.restaurant;
  }

  isEmpty(): boolean {
    return this.items.length === 0 ? true : false;
  }
}

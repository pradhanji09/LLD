import type { Item } from "./Item.js";

export class Restaurant {
  private static currentId = 0;

  private restaurantId: number;
  private name: string;
  private location: string;
  private menu: Item[] = [];

  constructor(name: string, location: string) {
    Restaurant.currentId++;
    this.restaurantId = Restaurant.currentId;
    this.name = name;
    this.location = location;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getAddress(): string {
    return this.location;
  }

  setAddress(location: string): void {
    this.location = location;
  }

  addItem(item: Item): void {
    this.menu.push(item);
  }

  getItem(): Item[] {
    return this.menu;
  }

  getItemByCode(code: string): Item | null {
    return this.menu.find((item) => item.getCode() === code) ?? null;
  }
}

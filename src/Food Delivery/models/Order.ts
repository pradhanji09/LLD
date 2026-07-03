import type { Item } from "./Item.js";
import type { Restaurant } from "./Resturant.js";
import type { User } from "./User.js";

enum OrderType {
  PICKUP = "PICKUP",
  DELIVERY = "DELIVERY",
}

abstract class Order {
  private static currentId = 0;
  private id: number;
  private items: Item[];
  private restaurant: Restaurant;
  private total: number;
  private user: User;
  private type: OrderType;

  constructor(
    items: Item[],
    restaurant: Restaurant,
    total: number,
    user: User,
    type: OrderType,
  ) {
    Order.currentId++;
    this.id = Order.currentId;
    this.items = items;
    this.restaurant = restaurant;
    this.user = user;
    this.total = total;
    this.type = type;
  }

  getOrderType(): OrderType {
    return this.type;
  }
}

class PickUpOrder extends Order {
  constructor(
    items: Item[],
    restaurant: Restaurant,
    total: number,
    user: User,
  ) {
    super(items, restaurant, total, user, OrderType.PICKUP);
  }
}

class DeliveryOrder extends Order {
  constructor(
    items: Item[],
    restaurant: Restaurant,
    total: number,
    user: User,
  ) {
    super(items, restaurant, total, user, OrderType.DELIVERY);
  }
}

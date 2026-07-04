import type { PaymentStrategy } from "../strategy/PaymentStrategy.js";
import type { Item } from "./Item.js";
import type { Restaurant } from "./Resturant.js";
import type { User } from "./User.js";

export interface OrderDetails {
  items: Item[];
  restaurant: Restaurant;
  total: number;
  user: User;
  payment: PaymentStrategy;
  scheduled: string;
}

export enum OrderType {
  PICKUP = "PICKUP",
  DELIVERY = "DELIVERY",
}

export abstract class Order {
  private static currentId = 0;
  private id: number;
  private items: Item[];
  private restaurant: Restaurant;
  private total: number;
  private user: User;
  private type: OrderType;
  private payment: PaymentStrategy;
  private scheduled: string;

  constructor(details: OrderDetails, type: OrderType) {
    Order.currentId++;
    this.id = Order.currentId;
    this.items = details.items;
    this.restaurant = details.restaurant;
    this.user = details.user;
    this.total = details.total;
    this.type = type;
    this.payment = details.payment;
    this.scheduled = details.scheduled;
  }

  getOrderType(): OrderType {
    return this.type;
  }

  processPayment(): boolean {
    if (!this.payment) {
      console.log("Choose payment method first");
      return false;
    }
    return this.payment.pay(this.total);
  }

  getTotal(): number {
    return this.total;
  }

  getRestaurant(): Restaurant {
    return this.restaurant;
  }

  getUser(): User {
    return this.user;
  }
}

export class PickUpOrder extends Order {
  private restaurantAddress: string;

  constructor(details: OrderDetails) {
    super(details, OrderType.PICKUP);
    this.restaurantAddress = details.restaurant.getAddress();
  }

  getAddress(): string {
    return this.restaurantAddress;
  }
}

export class DeliveryOrder extends Order {
  private userAddress = "";

  constructor(details: OrderDetails) {
    super(details, OrderType.DELIVERY);
    this.userAddress = details.user.getAddress();
  }

  getAddress(): string {
    return this.userAddress;
  }
}

import type { Order } from "../models/Order.js";

export class OrderManager {
  private static instance: OrderManager;
  private orders: Order[] = [];

  private constructor() {}

  static getInstance(): OrderManager {
    if (!OrderManager.instance) OrderManager.instance = new OrderManager();
    return OrderManager.instance;
  }

  addOrder(order: Order): void {
    this.orders.push(order);
  }

  listOrders(): void {
    for (const order of this.orders) {
      console.log(`Order : ${order.getTotal()}`);
    }
  }
}

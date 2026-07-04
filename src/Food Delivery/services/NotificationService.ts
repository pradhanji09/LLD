import type { Order } from "../models/Order.js";

export class NotificationService {
  static notify(order: Order): void {
    console.log(
      `Your Order has been Created in restaurant ${order.getRestaurant().getName()} \n`,
      `Created by: ${order.getUser().getName()} \n`,
      `Order Type: ${order.getOrderType()} | total amount ${order.getTotal()} \n`,
    );
  }
}

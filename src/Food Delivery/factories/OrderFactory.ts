import { Cart } from "../models/Cart.js";
import {
  DeliveryOrder,
  OrderType,
  PickUpOrder,
  type Order,
  type OrderDetails,
} from "../models/Order.js";
import type { Restaurant } from "../models/Resturant.js";
import type { User } from "../models/User.js";
import type { PaymentStrategy } from "../strategy/PaymentStrategy.js";

export interface OrderFactory {
  createOrder(
    user: User,
    cart: Cart,
    restaurant: Restaurant,
    payment: PaymentStrategy,
    type: OrderType,
  ): Order;
}

export class NowOrderFactory implements OrderFactory {
  createOrder(
    user: User,
    cart: Cart,
    restaurant: Restaurant,
    payment: PaymentStrategy,
    type: OrderType,
  ): Order {
    let order;
    const orderDetails: OrderDetails = {
      items: cart.getItems(),
      payment: payment,
      restaurant: restaurant,
      total: cart.getTotal(),
      user: user,
      scheduled: new Date().toDateString(),
    };

    switch (type) {
      case OrderType.DELIVERY:
        order = new DeliveryOrder(orderDetails);
        break;
      case OrderType.PICKUP:
        order = new PickUpOrder(orderDetails);
        break;
      default:
        order = new PickUpOrder(orderDetails);
        break;
    }

    return order;
  }
}

export class scheduleOrderFactory implements OrderFactory {
  private scheduleTime: string;

  constructor(time: string) {
    this.scheduleTime = time;
  }

  createOrder(
    user: User,
    cart: Cart,
    restaurant: Restaurant,
    payment: PaymentStrategy,
    type: OrderType,
  ): Order {
    let order;
    const orderDetails: OrderDetails = {
      items: cart.getItems(),
      payment: payment,
      restaurant: restaurant,
      total: cart.getTotal(),
      user: user,
      scheduled: this.scheduleTime,
    };

    switch (type) {
      case OrderType.DELIVERY:
        order = new DeliveryOrder(orderDetails);
        break;
      case OrderType.PICKUP:
        order = new PickUpOrder(orderDetails);
        break;
      default:
        order = new PickUpOrder(orderDetails);
        break;
    }

    return order;
  }
}

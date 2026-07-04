// Intialize all Item, Resturant, User

import {
  NowOrderFactory,
  scheduleOrderFactory,
  type OrderFactory,
} from "./factories/OrderFactory.js";
import { OrderManager } from "./managers/OrderManager.js";
import { RestaurantManager } from "./managers/RestaurantManager.js";
import { Item } from "./models/Item.js";
import type { Order, OrderType } from "./models/Order.js";
import { Restaurant } from "./models/Resturant.js";
import type { User } from "./models/User.js";
import { NotificationService } from "./services/NotificationService.js";
import type { PaymentStrategy } from "./strategy/PaymentStrategy.js";

export class Orchestrator {
  private static instance: Orchestrator;

  private restaurantManager = RestaurantManager.getInstance();
  private orderManager = OrderManager.getInstance();

  private constructor() {
    this.intializeValues();
  }

  public static getInstance(): Orchestrator {
    if (!Orchestrator.instance) {
      Orchestrator.instance = new Orchestrator();
    }
    return Orchestrator.instance;
  }

  private intializeValues(): void {
    const restaurant1 = new Restaurant("Tarini", "bhubaneswar");
    restaurant1.addItem(new Item("P1", "Chiken Masala", 100));
    restaurant1.addItem(new Item("P2", "Biriyani", 150));

    const restaurant2 = new Restaurant("Swasti", "bhubaneswar");
    restaurant2.addItem(new Item("P1", "Veg Thali", 120));
    restaurant2.addItem(new Item("P2", "Pualo", 100));

    const restaurant3 = new Restaurant("Mayfair", "cuttack");
    restaurant3.addItem(new Item("P1", "Masal Dosa", 1000));
    restaurant3.addItem(new Item("P2", "Paneer", 150));

    this.restaurantManager.addRestaurant(restaurant1);
    this.restaurantManager.addRestaurant(restaurant2);
    this.restaurantManager.addRestaurant(restaurant3);
  }

  searchRestaurant(location: string) {
    return this.restaurantManager.searchByLocation(location);
  }

  selectRestaurant(user: User, restaurant: Restaurant) {
    const cart = user.getCart();
    if (cart.getRestaurant() && cart.getRestaurant() !== restaurant) {
      cart.clearCart();
    }
    cart.setRestaurant(restaurant);
  }

  addToCart(user: User, itemCode: string) {
    const cart = user.getCart();
    const restaurant = cart.getRestaurant();
    if (!restaurant) {
      console.log("Select a restaurant first");
      return;
    }
    const item = restaurant.getItemByCode(itemCode);
    if (!item) {
      console.log(`Item ${itemCode} not found`);
      return;
    }

    cart.addItem(item);
  }

  checkoutNowOrder(user: User, type: OrderType, payement: PaymentStrategy) {
    return this.checkout(user, type, payement, new NowOrderFactory());
  }

  checkoutScheduledOrder(
    user: User,
    type: OrderType,
    payement: PaymentStrategy,
    scheduleTime: string,
  ) {
    return this.checkout(
      user,
      type,
      payement,
      new scheduleOrderFactory(scheduleTime),
    );
  }

  private checkout(
    user: User,
    type: OrderType,
    payement: PaymentStrategy,
    orderFactory: OrderFactory,
  ): Order | undefined {
    if (user.getCart().isEmpty()) {
      console.log("Add item to cart");
      return;
    }
    const userCart = user.getCart();
    const restaurant = userCart.getRestaurant();
    if (!restaurant) {
      console.log("Select a restaurant first");
      return;
    }

    const order = orderFactory.createOrder(
      user,
      userCart,
      restaurant,
      payement,
      type,
    );
    this.orderManager.addOrder(order);
    return order;
  }

  payForOrder(user: User, order: Order): void {
    const isPaymentSuccess = order.processPayment();

    if (isPaymentSuccess) {
      NotificationService.notify(order);
      user.getCart().clearCart();
    }
  }
}

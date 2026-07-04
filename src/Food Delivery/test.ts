import { Orchestrator } from "./Orchestrator.js";
import { User } from "./models/User.js";
import { OrderType } from "./models/Order.js";
import { CreditCardStrategy, UpiStrategy } from "./strategy/PaymentStrategy.js";

function runTests() {
  const orchestrator = Orchestrator.getInstance();

  const user1 = new User("Alice");
  user1.setAddress("123 Main St, Bhubaneswar");
  console.log(`Created user: ${user1.getName()}`);

  const restaurants = orchestrator.searchRestaurant("bhubaneswar");
  console.log(restaurants);

  const selectedRestaurant = restaurants[0];
  if (!selectedRestaurant) {
    console.log("No restaurants found.");
    return;
  }

  orchestrator.selectRestaurant(user1, selectedRestaurant);

  orchestrator.addToCart(user1, "P1");
  orchestrator.addToCart(user1, "P2");

  const cart = user1.getCart();

  const creditCardPayment = new CreditCardStrategy();
  const order1 = orchestrator.checkoutNowOrder(
    user1,
    OrderType.DELIVERY,
    creditCardPayment,
  );

  if (!order1) {
    console.log(`Order Not created`);
    return;
  }

  orchestrator.payForOrder(user1, order1);

  // orchestrator.selectRestaurant(user1, restaurants[1]);
  // orchestrator.addToCart(user1, "P1");

  // const upiPayment = new UpiStrategy();
  // const scheduledOrder = orchestrator.checkoutScheduledOrder(
  //   user1,
  //   OrderType.PICKUP,
  //   upiPayment,
  //   "Tomorrow 7:00 PM",
  // );
}

runTests();

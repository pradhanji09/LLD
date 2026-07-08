// Component Interface
interface Burger {
  getPrice(): number;
  getDescription(): string;
}

// Contrete Component Class
class BasicBurger implements Burger {
  getPrice(): number {
    return 5;
  }

  getDescription(): string {
    return "Basic Burger";
  }
}

abstract class BasicDecorator implements Burger {
  protected burger: Burger;

  constructor(burger: Burger) {
    this.burger = burger;
  }

  getPrice(): number {
    return this.burger.getPrice();
  }

  getDescription(): string {
    return this.burger.getDescription();
  }
}

class CheeseBurgerDecorator extends BasicDecorator {
  getPrice(): number {
    return this.burger.getPrice() + 20;
  }

  getDescription(): string {
    return `${this.burger.getDescription()} + with Cheese`;
  }
}

class BaconBurgerDecorator extends BasicDecorator {
  getPrice(): number {
    return this.burger.getPrice() + 50;
  }

  getDescription(): string {
    return `${this.burger.getDescription()} + with Bacon`;
  }
}

let burger = new BasicBurger();
console.log(burger.getPrice());
burger = new CheeseBurgerDecorator(burger);
console.log(burger.getPrice());
burger = new BaconBurgerDecorator(burger);
console.log(burger.getPrice());

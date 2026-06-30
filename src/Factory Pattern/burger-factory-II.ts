// Interface for Prodcut
// Concrete Class
// Abstarct Factory Class

interface Burger {
  prepare(): void;
}

class BasicBurger implements Burger {
  prepare(): void {
    console.log("Basic Burger is preparing");
  }
}

class PremiumBurger implements Burger {
  prepare(): void {
    console.log("Premium Burger is preparing");
  }
}

class BasicWheatBurger implements Burger {
  prepare(): void {
    console.log("Basic Wheat Burger is preparing");
  }
}

class PremiumWheatBurger implements Burger {
  prepare(): void {
    console.log("Premium Wheat Burger is preparing");
  }
}

interface BurgerFactory {
  createBurger(type: string): Burger;
}

class SinkBurgerFactory implements BurgerFactory {
  createBurger(type: string): Burger {
    switch (type) {
      case "basic":
        return new BasicBurger();
      case "premium":
        return new PremiumBurger();
      default:
        throw new Error("Select a valid burger");
    }
  }
}

class KingBurgerFactory implements BurgerFactory {
  createBurger(type: string): Burger {
    switch (type) {
      case "basic":
        return new BasicWheatBurger();
      case "premium":
        return new PremiumWheatBurger();
      default:
        throw new Error("Select a valid burger");
    }
  }
}

const factory = new SinkBurgerFactory();
const burger = factory.createBurger("premium");
burger.prepare();

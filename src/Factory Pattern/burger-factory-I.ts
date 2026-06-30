// Interface for Prodcut
// Concrete Class
// Factory Class

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

class BurgerFactory {
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

const factory = new BurgerFactory();
const burger = factory.createBurger("premium");
burger.prepare();

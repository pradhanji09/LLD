//The factory doesn't just create one type of product (like Burgers)
// it creates multiple related products (like Burgers and Breads)

interface Burger {
  prepare(): void;
}

interface Bread {
  prepare(): void;
}

class BasicGarlicBread implements Bread {
  prepare(): void {
    console.log("Praparing Garlic Bread");
  }
}

class BasicWheatBread implements Bread {
  prepare(): void {
    console.log("Praparing Garlic Bread");
  }
}

class PremiumGarlicBread implements Bread {
  prepare(): void {
    console.log("Praparing Premium Garlic Bread");
  }
}

class PremiumWheatBread implements Bread {
  prepare(): void {
    console.log("Praparing Premium Garlic Bread");
  }
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

interface MealFactory {
  createBurger(type: string): Burger;
  createBread(type: string): Bread;
}

class SinkBurgerFactory implements MealFactory {
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

  createBread(type: string): Bread {
    switch (type) {
      case "basic":
        return new BasicGarlicBread();
      case "premium":
        return new PremiumGarlicBread();
      default:
        throw new Error("Choose Valid Bread");
    }
  }
}

class KingBurgerFactory implements MealFactory {
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

  createBread(type: string): Bread {
    switch (type) {
      case "basic":
        return new BasicWheatBread();
      case "premium":
        return new PremiumWheatBread();
      default:
        throw new Error("Choose Valid Bread");
    }
  }
}

const mealFactory = new SinkBurgerFactory();
const burger = mealFactory.createBurger("basic");
const bread = mealFactory.createBread("basic");

burger.prepare();
bread.prepare();

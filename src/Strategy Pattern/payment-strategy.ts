interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Amount ${amount} deducted from Credit Card`);
  }
}

class UPIStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Amount ${amount} deducted from UPI account`);
  }
}

class CryptoStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Amount ${amount} deducted from Crypto Account`);
  }
}

class PaymentContext {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  processPayment(amount: number): void {
    this.strategy.pay(amount); // Delegates to Stratey
  }

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }
}

const processor = new PaymentContext(new CreditCardStrategy());
processor.processPayment(100);

processor.setStrategy(new UPIStrategy());
processor.processPayment(50);

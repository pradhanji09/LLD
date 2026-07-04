export interface PaymentStrategy {
  pay(amount: number): boolean;
}

export class NetBankingStrategy implements PaymentStrategy {
  pay(amount: number): boolean {
    console.log(`Payment Done with NetBanking of amount ${amount}`);
    return true;
  }
}

export class UpiStrategy implements PaymentStrategy {
  pay(amount: number): boolean {
    console.log(`Payment Done with UPI of amount ${amount}`);
    return true;
  }
}

export class CreditCardStrategy implements PaymentStrategy {
  pay(amount: number): boolean {
    console.log(`Payment Done with Credit Card of amount ${amount}`);
    return true;
  }
}

export class Item {
  private code: string;
  private name: string;
  private price: number;

  constructor(code: string, name: string, price: number) {
    this.code = code;
    this.name = name;
    this.price = price;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getCode(): string {
    return this.code;
  }

  setCode(code: string): void {
    this.code = code;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    this.price = price;
  }
}

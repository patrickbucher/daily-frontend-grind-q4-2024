class Menu implements Iterable<number> {
  private menu: Map<string, number>;

  constructor() {
    this.menu = new Map<string, number>();
  }

  add(name: string, price: number) {
    this.menu.set(name, price);
  }

  [Symbol.iterator](): Iterator<number> {
    return this.menu.values();
  }
}

let menu: Menu = new Menu();
menu.add("Beer", 5.0);
menu.add("Coffee", 4.2);
menu.add("Water", 2.5);

let total: number = 0;
for (let price of menu) {
  total += price;
}

console.log(`total price: ${total}`);

class Item<T extends { identify(): string }> {
  private id: string;

  constructor(
    private name: string,
    thing: T,
  ) {
    this.id = thing.identify();
  }
}

class StockedItem<
  T extends { identify(): string; count(): number },
> extends Item<T> {
  private stock: number;

  constructor(name: string, thing: T) {
    super(name, thing);
    this.stock = thing.count();
  }
}

const orange = new Item("Orange", { identify: () => "ORNG" });
const oranges = new StockedItem("Oranges", {
  identify: () => "ORNG",
  count: () => 37,
});

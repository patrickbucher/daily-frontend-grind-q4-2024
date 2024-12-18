class Collection<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  filter<V extends T>(predicate: (target: T) => target is V): V[] {
    return this.items.filter((i) => predicate(i)) as V[];
  }
}

class Car {
  constructor(
    public brand: string,
    public model: string,
  ) {}
}

class Drink {
  constructor(
    public brand: string,
    public name: string,
  ) {}
}

function isDrink(target: any): target is Drink {
  return target instanceof Drink;
}

let stuff = new Collection<Car | Drink>();
stuff.add(new Car("Porsche", "911"));
stuff.add(new Drink("Jack Daniels", "Whiskey"));
let drinks = stuff.filter<Drink>(isDrink);
console.log(drinks);

# Advanced generic types

JavaScript's collections can be used with generic type parametes, e.g. `Map<K,
V>` with type `K` for keys and type `V` for values, and `Set<T>` with type `T`
for the (unique) values:

```typescript
let numbers: number[] = [1, 2, 3, 4, 1, 2, 3, 1, 2, 1];
let uniqueNumbers: Set<number> = new Set<number>();
let numbersCount: Map<number, number> = new Map<number, number>();

for (let n of numbers) {
  uniqueNumbers.add(n);
  if (numbersCount.has(n)) {
    let c: number = numbersCount.get(n) as number;
    numbersCount.set(n, c + 1);
  } else {
    numbersCount.set(n, 1);
  }
}

console.log(uniqueNumbers);
console.log(numbersCount);
```

TypeScript defines generic interfaces for iteration:

- `Iterator<T>`: an iterator with a `next` method returning `IteratorResult<T>`
  objects
- `IteratorResult<T>`: a result object with a `done` and a `value` property
- `Iterable<T>`: an object that defines the `Symbol.iterator` property for
  iteration
- `IterableIterator<T>`: a combination of `Iterable<T>` and `Iterator<T>`

The following example shows how the `Iterator` and `IteratorResult` types are
used explicitly:

```typescript
let menu: Map<string, number> = new Map<string, number>();
menu.set("Beer", 5.0);
menu.set("Coffee", 4.2);
menu.set("Water", 2.5);

let prices: Iterator<number> = menu.values();
let price: IteratorResult<number>;
let total: number = 0;
for (price = prices.next(); !price.done; price = prices.next()) {
  total += price.value;
}

console.log(`total price: ${total}`); // 11.7
```

Notice that iterators are only available since ES6. To target ES5 an earlier,
the `downlevelIteration` compiler option needs to be set to `true`.

The `prices` iterator in the above example cannot directly be used in a
`for`/`of` loop:

```typescript
let total: number = 0;
for (let price of menu.prices()) {
  total += price;
}
```

    error TS2488: Type 'Iterator<number, any, any>' must have a '[Symbol.iterator]()' method that returns an iterator.

This is where the `IterableIterator<T>` interfaces is useful, which allows for
objects to be directly iterated over by combining the `Iterator<T>` with the
`Iterable<T>` interfaces:

```typescript
class Menu {
  private menu: Map<string, number>;

  constructor() {
    this.menu = new Map<string, number>();
  }

  add(name: string, price: number) {
    this.menu.set(name, price);
  }

  prices(): IterableIterator<number> {
    return this.menu.values();
  }
}

let menu: Menu = new Menu();
menu.add("Beer", 5.0);
menu.add("Coffee", 4.2);
menu.add("Water", 2.5);

let total: number = 0;
for (let price of menu.prices()) {
  total += price;
}

console.log(`total price: ${total}`);
```

The method `Map.values` returns an iterator, which can be accessed over the
`Menu.prices` method. To go one step further, the `Menu` class can be made
iterable, saving the explicit method call:

```typescript
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
```

TODO: index types (p. 321 ff.)

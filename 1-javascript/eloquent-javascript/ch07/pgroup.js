class PGroup {
  #items;

  constructor(items) {
    this.#items = items;
  }

  get items() {
    return this.#items;
  }

  add(item) {
    if (!this.has(item)) {
      let items = [...this.#items, item];
      return new PGroup(items);
    }
    return this;
  }

  del(item) {
    let items = this.#items.filter((i) => i != item);
    return new PGroup(items);
  }

  has(item) {
    for (const i of this.#items) {
      if (i === item) {
        return true;
      }
    }
    return false;
  }

  [Symbol.iterator]() {
    return new PGroupIterator(this.#items);
  }
}

class PGroupIterator {
  #items;
  #i;

  constructor(items) {
    this.#items = items;
    this.#i = -1;
  }

  next() {
    this.#i++;
    if (this.#i < this.#items.length) {
      return { value: this.#items[this.#i], done: false };
    }
    return { done: true };
  }
}

let primes = new PGroup([1, 2, 3, 5, 7]);
console.log(primes.has(1));
primes = primes.del(1);
console.log(primes.has(1));
primes = primes.add(11);
primes = primes.add(11);
console.log(primes.items);

for (const prime of primes) {
  console.log(prime);
}

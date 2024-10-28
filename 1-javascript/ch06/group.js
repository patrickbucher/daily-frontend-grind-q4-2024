class Group {
  #items;

  constructor() {
    this.#items = [];
  }

  get items() {
    return this.#items;
  }

  add(item) {
    if (!this.has(item)) {
      this.#items.push(item);
    }
  }

  del(item) {
    let pos = -1;
    for (let i = 0; i < this.#items.length; i++) {
      if (this.#items[i] === item) {
        pos = i;
        break;
      }
    }
    if (pos != -1) {
      this.#items.splice(pos, 1);
    }
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
    return new GroupIterator(this.#items);
  }

  static fromIterable(iter) {
    const group = new Group();
    for (const item of iter) {
      group.add(item);
    }
    return group;
  }
}

class GroupIterator {
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

const primes = Group.fromIterable([1, 2, 3, 5, 7]);
console.log(primes.has(1));
primes.del(1);
console.log(primes.has(1));
primes.add(11);
primes.add(11);
console.log(primes.items);

for (const prime of primes) {
  console.log(prime);
}

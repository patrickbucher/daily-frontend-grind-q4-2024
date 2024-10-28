class FibIterator {
  constructor(max) {
    this.fibs = new Map();
    this.fibs.set(0, 1);
    this.fibs.set(1, 1);
    this.i = 0;
    this.max = max;
  }

  next() {
    let value = 0;
    if (this.i == this.max) {
      return { done: true };
    }
    if (this.fibs.has(this.i)) {
      value = this.fibs.get(this.i);
    } else {
      value = this.fibs.get(this.i - 2) + this.fibs.get(this.i - 1);
      this.fibs.set(this.i, value);
    }
    this.i++;
    return { value, done: false };
  }

  [Symbol.iterator]() {
    return this;
  }
}

const fibs = new FibIterator(25);
for (const x of fibs) {
  console.log(x);
}

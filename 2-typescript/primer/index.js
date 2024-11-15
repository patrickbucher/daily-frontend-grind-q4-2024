class Sequence {
  constructor(step, n) {
    this.step = step;
    this.n = n;
  }

  *[Symbol.iterator]() {
    let value = 0;
    for (let i = 0; i < this.n; i++) {
      value += this.step;
      yield value;
    }
  }
}

for (let x of new Sequence(7, 5)) {
  console.log(x);
}

[...new Sequence(10, 5)].forEach((x) => console.log(x));

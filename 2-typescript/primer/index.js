class Sequence {
  constructor(step, n) {
    this.step = step;
    this.n = n;
    this.value = 0;
    this.i = 0;
  }

  next() {
    this.value += this.step;
    this.i++;
    return {
      value: this.value,
      done: this.i > this.n,
    };
  }
}

let rowOfSix = new Sequence(6, 10);
let result = rowOfSix.next();
while (!result.done) {
  console.log(result.value);
  result = rowOfSix.next();
}

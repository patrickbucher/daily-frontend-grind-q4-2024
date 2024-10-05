class Vec {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get length() {
    return Math.hypot(this.#x, this.#y);
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  minus(other) {
    return new Vec(this.x - other.x, this.y - other.y);
  }

  toString() {
    return `(${this.#x},${this.#y})`;
  }
}

let a = new Vec(5, 3);
let b = new Vec(2, 1);
console.log(a.plus(b) + "");
console.log(a.minus(b) + "");
console.log(a.length);
console.log(b.length);

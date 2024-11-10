let alice = {
  name: "Alice",
  age: 52,
};

let bob = {
  name: "Bob",
  age: 47,
};

let ProtoPerson = {
  toString: function () {
    return `${this.name} is ${this.age} years old.`;
  },
};

Object.setPrototypeOf(alice, ProtoPerson);
Object.setPrototypeOf(bob, ProtoPerson);

console.log(`alice: ${alice}`);
console.log(`bob: ${bob}`);

let product = {
  name: "Candy Bar",
  price: 1.25,
};

console.log(`product: ${product}`);

# JavaScript Primer, Part 2

A JavaScript object inherits its properties and methods from another object
known as its _prototype_. The links of prototypes form an inheritance chain. By
default, an object defined by a literal has the prototype `Object`, which
defines the following methods related to prototypes:

- `getPrototypeOf`: returns an object's prototype
- `setPrototypeOf`: sets an object's prototype
- `getOwnPropertyNames`: returns the names of the properties defined on an
  object itself (excluding inherited properties from its prototype)

The following example defines two objects and checks if they share the same
prototype:

```javascript
let alice = {
  name: "Alice",
  age: 52,
};

let bob = {
  name: "Bob",
  age: 47,
};

let aliceProto = Object.getPrototypeOf(alice);
let bobProto = Object.getPrototypeOf(bob);
console.log(`same prototype? ${aliceProto === bobProto}`);
console.log(`alice's properties: ${Object.getOwnPropertyNames(alice)}`);
console.log(`bob's properties: ${Object.getOwnPropertyNames(bob)}`);
```

Output:

    same prototype? true
    alice's properties: name,age
    bob's properties: name,age

It is possible to define operations shared among objects directly on its default
prototype `Object`:

```javascript
let alice = {
  name: "Alice",
  age: 52,
};

let bob = {
  name: "Bob",
  age: 47,
};

let aliceProto = Object.getPrototypeOf(alice);

aliceProto.toString = function () {
  return `${this.name} is ${this.age} years old.`;
};

console.log(`alice: ${alice}`);
console.log(`bob: ${bob}`);

let product = {
  name: "Candy Bar",
  price: 1.25,
};

console.log(`product: ${product}`);
```

Output:

    alice: Alice is 52 years old.
    bob: Bob is 47 years old.
    product: Candy Bar is undefined years old.

The method `toString` is overwritten directly on the prototype of the object
`alice`, which is `Object`. Therefore, `toString` is also overwritten for the
object `product`, which has no `age` property.

A better option is to define a common and custom prototype shared among the
relevant  objects explicitly, but leaving `Object` untouched:

```javascript
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
```

Output:

    alice: Alice is 52 years old.
    bob: Bob is 47 years old.
    product: [object Object]

## Constructor Functions and Prototype Chaining

Objects can not only be created using literal syntax, but also with _constructor
functions_, which can apply additional logic upon the object's creation.
Constructor functions have capitalized names by convention and are invoked using
the `new` keyword, setting the `this` parameter to the newly instantiated
object.

The constructor function's `prototype` property provides access to its prototype
object, to which methods can be attached:

```javascript
let Person = function (name, age) {
  this.name = name;
  this.age = age;
};

Person.prototype.toString = function () {
  return `${this.name} is ${this.age} years old.`;
};

let alice = new Person("Alice", 52);
let bob = new Person("Bob", 47);

console.log(alice.toString());
console.log(bob.toString());
```

Output:

    Alice is 52 years old.
    Bob is 47 years old.

Constructor functions can be chained by connecting their prototypes. A
constructor further down the chain can invoke the constructor function higher up
the chain using its `call` method:

```javascript
let Person = function (name, age) {
  this.name = name;
  this.age = age;
};

Person.prototype.toString = function () {
  return `${this.name} is ${this.age} years old`;
};

let Employee = function (name, age, percentage, salary) {
  Person.call(this, name, age);
  this.percentage = percentage;
  this.salary = salary;
};

Employee.prototype.toString = function () {
  let salary = this.percentage * 0.01 * this.salary;
  return `${Person.prototype.toString.call(this)} and earns ${salary}`;
};

Object.setPrototypeOf(Employee.prototype, Person.prototype);

let alice = new Employee("Alice", 52, 75.0, 120000);
let bob = new Person("Bob", 47);

console.log(alice.toString());
console.log(bob.toString());
```

Output:

    Alice is 52 years old and earns 90000
    Bob is 47 years old

The `toString` method of the prototype further up the chain has to be invoked
explicitly using `Person.prototype.toString.call`, passing it the `this`
reference of the calling object.

The `instanceof` operator determines whether or not an object is part of a
prototype chain. Using the example from above:

```javascript
console.log(`is Alice a Person? ${alice instanceof Person}`);
console.log(`is Alice an Employee? ${alice instanceof Employee}`);
console.log(`is Bob a Person? ${bob instanceof Person}`);
console.log(`is Bob an Employee? ${bob instanceof Employee}`);
```

Output:

    is Alice a Person? true
    is Alice an Employee? true
    is Bob a Person? true
    is Bob an Employee? false

Static methods can be defined by assigning properties to the constructor
function:

```javascript
Person.output = function (...people) {
  people.forEach((p) => console.log(p.toString()));
};

Person.output(alice, bob);
```

## Classes

Recent versions of JavaScript support classes, which are implemented using
prototypes underneath. Keywords such `class`, `extends`, `constructor`, `super`,
and `static` known from mainstream object-oriented languages such as C# and Java
are mere syntactic sugar for the concepts described above with prototypes.
Private members are created with a `#` prefix.

The example implementing an inheritance relationship between `Person` and
`Employee` from before can be expressed using classes as follows:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  toString() {
    return `${this.name} is ${this.age} years old`;
  }

  static output(...people) {
    people.forEach((p) => console.log(p.toString()));
  }
}

class Employee extends Person {
  constructor(name, age, percentage, salary) {
    super(name, age);
    this.percentage = percentage;
    this.salary = salary;
  }

  toString() {
    return `${super.toString()} and earns ${this.#salary()}`;
  }

  #salary() {
    return this.percentage * (this.salary / 100.0);
  }
}

let alice = new Person("Alice", 52);
let bob = new Employee("Bob", 47, 90, 120000);
Person.output(alice, bob);
```

Output:

    Alice is 52 years old
    Bob is 47 years old and earns 108000

Notice that for `bob` the `toString` method of `Employee` is called, even though
the static `output` method is defined on `Person`.

## Iterators and Generators

An iterator provides a function called `next`, which returns a sequence of
objects containing a `value` and a `done` property, the latter indicating
whether or not the sequence has been exhausted:

```javascript
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
```

Output:

    6
    12
    18
    24
    30
    36
    42
    48
    54
    60

A generator is a function declared using an asterisk character (`*`) that
returns an intermediate result using the `yield` keyword and l ater continues
its execution upon the next call. The state is maintained implicitly by the
runtime rather than explicitly by the programmer.

The number sequence from above can be expressed using a generator as follows:

```javascript
function* createSequence(step, n) {
  let value = 0;
  for (let i = 0; i < n; i++) {
    value += step;
    yield value;
  }
}
```

Generators can be consumed in a `for`/`of` loop or using the spread operator:

```javascript
for (let x of createSequence(6, 5)) {
  console.log(x);
}
[...createSequence(3, 4)].forEach((x) => console.log(x));
```

Output:

    6
    12
    18
    24
    30
    3
    6
    9
    12

For objects that provide sequences of items, a special proprty called
`Symbol.iterator` can be provided as a generator, allowing the object being used
as a sequence in loops and with spread operations:

```javascript
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
```

Output:

    7
    14
    21
    28
    35
    10
    20
    30
    40
    50

## Collections

An object's properties are key/value pairs. The keys and values of an object
called `obj` can be obtained using the methods `Object.keys(obj)` and
`Object.values(obj)`, respectively. Given an object and one of its keys, the
value can be obtained using square bracket notation: `let value = obj[key]`.

```javascript
let mouse = {
  name: "Pixie",
  legs: 4,
  food: "cheese",
};

for (let key of Object.keys(mouse)) {
  console.log(`${key}: ${mouse[key]}`);
}
```

Output:

    name: Pixie
    legs: 4
    food: cheese

Objects only support strings for keys. The `Map` type is more general in as far
as it allows for any types to be used as a key. A `Map` provides the following
operations (among others):

- `set(key, value)`: stores the `value` under `key`
- `get(key)`: returns the value stored under `key`
- `keys()`: returns an iterator over the keys
- `values()`: returns an iterator over the values
- `entries()`: returns an iterator over `[key, value]` arrays

Using a `Symbol` as a key avoids collisions, which could happen when the keys
are derived from the stored value:

```javascript
class Person {
  constructor(name, age) {
    this.id = Symbol();
    this.name = name;
    this.age = age;
  }
}

let alice = new Person("Alice", 52);
let bob = new Person("Bob", 47);

let people = new Map();
people.set(alice.id, alice);
people.set(bob.id, bob);

for (let [id, { name, age, ..._ }] of people.entries()) {
  console.log(`${id.toString()}: ${name} (${age})`);
}
```

Note that a `Symbol` is rather abstract and not intended for output:

    Symbol(): Alice (52)
    Symbol(): Bob (47)

A `Set` stores unique values and supports, among others, the following
operations:

- `add(value)`: adds a value to the set, if it is not already contained
- `entries()`: returns an iterator over the set's values in insertion order
- `has(value)`: returns true, if `value` is contained in the set, and `false`
  otherwise
- `size`: returns the number of elements in the set

```javascript
let additions = [
  [3, 5],
  [1, 4],
  [4, 4],
  [2, 1],
];

let sums = new Set();

for (let [a, b] of additions) {
  sums.add(a + b);
}
sums.forEach((s) => console.log(s));
```

Both the additions of `[3, 5]` and `[4, 4]` result in the sum of `8`, but this
particular result is stored only once in the set of sums.

Output:

    8
    5
    3

## Modules

Modules allow it to break an application into manageable junks. Most JavaScript
projects use either one of the following module systems:

1. _ECMAScript modules_ are the official standard built into recent runtimes.
2. _CommonJS modules_ are provided by Node.js and used to be the de facto
   standard.

Since ECMAScript modules can deal with CommonJS modules, most projects targeting
recent runtime versions should use ECMAScript modules. In Node.js, the type of
module can be configured by convention or by configuration:

- by convention: using file name extensions
    - Use the `.mjs` extension for ECMAScript module files.
    - Use the `.cjs` extension for CommonJS module files.
- by configuration: using the `type` setting in `package.json`
    - Use the `"type": "module"` setting for ECMAScript modules.
    - Use the `"type": "commonjs"` setting for CommonJS modules.

The following module defines functions for rounding values with different
granularities (`round.js`):

```javascript
export default function roundTo(value, granularity) {
  const factor = 1.0 / granularity;
  const scaledUp = value * factor;
  const rounded = Math.round(scaledUp);
  const scaledDown = rounded / factor;
  return scaledDown;
}

export function roundToNickels(value) {
  return roundTo(value, 0.05);
}

export function roundToDimes(value) {
  return roundTo(value, 0.1);
}
```

Functions defined in modules are private to the module by default and need to be
made available to other modules using the `export` keyword. The `default`
keyword denotes a single feature of the module that is imported by default
without having to use an explicit name.

The `round.js` module can be used in `index.js` as follows:

```javascript
import round, { roundToNickels, roundToDimes } from "./round.js";

console.log(round(10.0 / 3.0, 0.01));
console.log(roundToNickels(10.0 / 3.0));
console.log(roundToDimes(10.0 / 3.0));
```

The default feature of the module is imported using an alternative name: `round`
instead of `roundTo`. The other two functions are imported using their names.

If the module code resides in the same project, relative paths are used,
starting with `./` for modules located in the same directory, or starting with
`../` for modules located in a directory higher up in the hierarchy.

If external modules are used, such as those located in `node_modules`, the
import path starts with the module name: the name of the module directory
located in `node_modules`.


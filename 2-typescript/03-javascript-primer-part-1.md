# JavaScript primer, part 1

To understand the benefits provided by TypeScript, one has to understand what
JavaScript issues it addresses.

For the sake of convenient demonstration with automatic execution of a script
upon saving it, the `nodemon` package can be used in a new project called
`primer`:

```bash
mkdir primer
cd primer
npm init --yes
npm install nodemon@3.1.7
touch index.js
npx nodemon index.js
```

JavaScript is similar to many other programming languages in many ways, but it
confuses its users with some of its—peculiar, but well-defined—behaviour:

```javascript
let penPrice = 5;
let paperPrice = "5";
if (penPrice == paperPrice) {
  console.log("pen and paper cost the same");
}
console.log(`total price: ${penPrice + paperPrice}`);
```

Output:

    pen and paper cost the same
    total price: 55

The operators `==` and `+` deal differently with the same types.

In JavaScript, variables are untyped, but values have a type. There are the
following built-in types in JavaScript:

- `number`: numeric values, both floating-point and integer values
- `string`: text data
- `boolean`: the values `true` and `false`
- `symbol`: unique constant values
- `null`: a non-existant or invalid reference with the only possible value of
  `null`
- `undefined`: the type of variables that are uninitialized
- `object`: the type of compound values, made up of primitive and/or other
  compound values

The type of an expression can be determined by using the `typeof` operator on
it, which returns the type name as a `string`:

    > typeof 5
    'number'
    > typeof "5"
    'string'
    > typeof (typeof 5)
    'string'
    > typeof null
    'object'

Notice the last example: The type of `null` is `object` instead of `null`. This
behaviour is inconsistent, but cannot be changed because a lot of code depends
on this (mis)behaviour.

## Type Coercion

An operator being applied to two values of different types needs to coerce one
value to the type of the other value. Different operators apply different rules
for this process, which is called _type coercion_: The `==` operator applied to
a `number` and a `string` converts the `string` to a `number` and then compares
the two `number` values:

    > 3 == "5"
    false
    > 3 == "3"
    true

However, the `+` operator applied to a `string` and a value of any other type
will first convert the other value to a `string` and then concatenate both
`string` values:

    > "3" + 4
    '34'
    > 4 + "3"
    '43'

When aplied to a `number` value and `undefined`, the latter is converted to
`NaN`, resulting in an addition that results in `NaN` itself:

    > 3 + undefined
    NaN

Such behaviour is erratic, but well-defined and documented. To solve problems
arising from those rules, the strict equality operator `===` can be used instead
of `==`. Here, both value and type must match:

    > 3 == "3"
    true
    > 3 === "3"
    false

To make sure that numbers are added instead of concatenated, use explicit type
conversion:

    > let x = 3;
    > let y = 4;
    > let z = "5";
    > const addNumbers = (a, b) => Number(a) + Number(b);
    > addNumbers(x, y);
    7
    > addNumbers(y, z);
    9

Type coercion can be very useful, too: The or-operator `||` converts `null` and
`undefined` to `false`, which allows for defining fallback values:

    > let userChoice = userInput || "Hamburger";
    > userChoice
    'Hamburger'

Unfortunately, not only `null` and `undefined` are coerced into `false`, but
also the empty string `""`, the number `0`, and `NaN`:

    > let defaultInterestRate = 1.5;
    > let explicitInterestRate = 0;
    > let actualInterestRate = explicitInterestRate || defaultInterestRate;
    > actualInterestRate
    1.5

Here, the fallback to the default value is not desired, because `0` is a
perfectly fine value in this context. The _nullish coalescing operator_ `??`,
which is a rather recent addition to JavaScript, only converts `null` and
`undefined` to `false`:

    > let defaultInterestRate = 1.5;
    > let explicitInterestRate = 0;
    > let actualInterestRate = explicitInterestRate ?? defaultInterestRate;
    > actualInterestRate
    0

## Functions

Function parameters are untyped, and argument values will be coerced as needed
based on the operators being applied to them. Parameters can be given default
values so that they don't end up being `undefined` when the function is called
with fewer arguments than specified:

    > const formatCurrency = (currency, amount = 0.0) => `${currency} ${amount}`;
    > formatCurrency("CHF", 3.5);
    'CHF 3.5'
    > formatCurrency("CHF");
    'CHF 0'

To deal with a variable number of arguments, rest parameters can be used:

    > const sum = (...xs) => xs.reduce((acc, x) => acc + x, 0);
    > sum(3, 4, 5);
    12

Values such as `undefined` and `NaN` being passed explicitly have to be dealt
with programmatically:

```typescript
function mean(...numbers) {
  let actualNumbers = numbers.map((x) => (Number.isNaN(x) ? 0 : Number(x)));
  let sum = actualNumbers.reduce((acc, x) => acc + x, 0);
  return sum / actualNumbers.length;
}
```

## Arrays

JavaScript arrays are dynamically sized and can take up elements of different
types. They support various operations:

- operations on single values
    - `push(item)`: adds `item` at the end
    - `pop()`: removes and returns the last item
    - `unshift(item)`: adds `item` at the beginning
    - `shift()`: removes and returns the first item
- operations on the entire array or parts of it
    - `concat(others)`: returns a new array consisting of the original elements
      and the elements of the passed arrays
    - `join(separator)`: joins the array elements to a string with `separator`
      in between
    - `sort(compare)`: returns a new array with the original elements in
      ascending order; an optional `compare` function can be passed
    - `reverse()`: returns a new array with the original elements in reversed
      order
    - `slice(start, end)`: returns a section of the array from start (inlcusive)
      to end (exclusive)
    - `splice(index, count)`: removes `count` elements starting from `index`
    - `includes(value)`: returns `true` if the array contains `value`; `false`
      otherwise
- higher-order functions
    - `every(predicate)`: returns `true` if `predicate` returns `true` for all
      elements
    - `some(predicate)`: returns `true` if `predicate` returns `true` for at
      least one element
    - `filter(predicate)`: returns an array consisting of the elements for which
      `predicate` returns `true`
    - `find(predicate)`: returns the first value for which `predicate` returns
      `true`
    - `findIndex(predicate)`: returns the first index of the value for which
      `predicate` returns `true`
    - `forEach(callback)`: calls the `callback` function on each element
    - `map(callback)`: returns an array consisting of the return values of
      `callback` called on every element
    - `reduce(callback, start)`: combines the array elements using the
      `callback` function and an optional `start` value

Examples:

    > let numbers = [1, 2, 3]
    > numbers.push(4)
    > numbers.unshift(0)
    > numbers.pop()
    4
    > numbers.shift()
    0

    > [1, 2, 3].concat([4, 5, 6], [7, 8, 9])
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    > [1, 2, 3, 4, 5].join(" < ")
    '1 < 2 < 3 < 4 < 5'
    > [5, 2, 3, 4, 1].sort()
    [ 1, 2, 3, 4, 5 ]
    > [1, 2, 3, 4, 5].reverse()
    [ 5, 4, 3, 2, 1 ]
    > [2, 4, 6, 8].slice(2, 4)
    [ 6, 8 ]
    > [1, 2, 3, 4, 5].splice(2, 3)
    [ 3, 4, 5 ]
    > [2, 4, 6, 8].includes(5)
    false

    > [1, 1, 2, 3, 5, 8, 13, 21].every(x => x % 2 == 0)
    false
    > [1, 1, 2, 3, 5, 8, 13, 21].some(x => x % 2 == 0)
    true
    > [1, 1, 2, 3, 5, 8, 13, 21].filter(x => x % 2 == 0)
    [ 2, 8 ]
    > [1, 1, 2, 3, 5, 8, 13, 21].find(x => x % 2 == 0)
    2
    > [1, 1, 2, 3, 5, 8, 13, 21].findIndex(x => x % 2 == 0)
    2
    > [1, 1, 2, 3, 5, 8, 13, 21].forEach(x => console.log(`x=${x}`))
    x=1
    x=1
    x=2
    x=3
    x=5
    x=8
    x=13
    x=21
    > [1, 1, 2, 3, 5, 8, 13, 21].map(x => x * 2)
    [ 2,  2,  4,  6, 10, 16, 26, 42 ]
    > [1, 1, 2, 3, 5, 8, 13, 21].reduce((acc, x) => acc + x, 0)
    54

An array can be passed to a function expecting rest parameters by applying the
spread operator `...` to it:

```javascript
function sumUp(...numbers) {
  return numbers.reduce((acc, x) => acc + x, 0);
}

const numbers = [1, 1, 2, 3, 5, 8];
console.log(sumUp(...numbers)); // 20
```

The spread operator can also be used to concatenate arrays:

    > let xs = [2, 4, 6, 8, 10];
    > let ys = [3, 6, 9, 12, 15];
    > let zs = [...xs, ...ys];
    > zs
    [ 2, 4, 6,  8, 10, 3, 6, 9, 12, 15 ]

Arrays can be unpacked by applying destructuring assignment to them:

```javascript
let words = ["read", "write", "think", "morning"];
let [first, second] = words;
let [, , third] = words;
let [, , ...lastTwo] = words;
console.log(`first: ${first}`);
console.log(`second: ${second}`);
console.log(`third: ${third}`);
console.log(`lastTwo: ${lastTwo}`);
```

Output:

    first: read
    second: write
    third: think
    lastTwo: think,morning

## Objects

JavaScript objects are collections of properties, which have a name and a value.
Objects can be expressed using a literal syntax:

    > let alice = { name: "Alice", age: 52 };
    > let bob = { name: "Bob", age: 46 };

Properties can be accessed using the dot operator, added by assignment, and
removed using the `delete` keyword:

    > let aliceAge = alice.age;
    > alice.place = "Sweden";
    > delete alice.name;
    > alice
    { age: 52, place: 'Sweden' }

Reading a property that doesn't exist returns `undefined`. The _optional
chaining operator_ `?.` will stop the evaluation once `null` or `undefined` is
reached. This is especially useful in combination with the `??` operator:

    > bob?.place?.population ?? 0;
    0

The spread operator can be applied to objects for destructuring:

    > let { name, age } = bob;
    > name
    'Bob'
    > age
    46

    > let olderBob = {...bob, age: 60, disease: "Diabetes" };
    > olderBob
    { name: 'Bob', age: 60, disease: 'Diabetes' }

    > let { bobsName, ...otherProperties } = olderBob;
    > otherProperties
    { name: 'Bob', age: 60, disease: 'Diabetes' }

An object can be turned into its JSON representation using `JSON.stringify`:

    > JSON.stringify(bob);
    '{"name":"Bob","age":46}'
    > JSON.stringify(alice);
    '{"age":52,"place":"Sweden"}'

JavaScript objects support getters and setters:

```javascript
let stock = {
  item: "Beer",
  _price: 1.25,
  _quantity: 100,

  set price(newPrice) {
    this._price = newPrice;
  },

  get price() {
    return this._price;
  },

  set quantity(newQuantity) {
    this._quantity = newQuantity;
  },

  get quantity() {
    return this._quantity;
  },

  get worth() {
    return this._price * this._quantity;
  },
};

console.log(`stock worth before: ${stock.worth}`);
stock.price *= 1.03; // inflation
stock.quantity += 100; // hoarding
console.log(`stock worth after: ${stock.worth}`);
```

Output:

    stock worth before: 125
    stock worth after: 257.5

- The properties `price` and `quanitity` have getter and setter methods; values
  can be read from them and be assigned to them. They are backed internal
  properties `_price` and `_quantity`.
- The property `worth` is a computed property that only has a `get` method and
  therefore cannot be overwritten.

### `this`

`this` refers to different objects depending on how a function or method using
it is called. Consider a function that outputs a label and a value:

```javascript
function output(value) {
  console.log(`${this.label}=${value}`);
}

label = "x";
output(13);
```

Output:

    x=13

The `this` object refers to the _global object_ by default. Properties can be
set to the global object by simple assignment (as `label = "x"` above) without
using the `var`, `let`, or `const` keyword—except in strict mode!

Functions and methods are objects in JavaScript, which have their own properties
and methods in turn. The above function call is actually a convenience syntax
for the following invocation:

```javascript
output.call(global, 13);
```

The global object is called `global` in Node.js and `window` or `self` in a
browser context; the latter having an object called `document` representing the
DOM.

When a function belongs to an object and is invoked as a method, the `this`
keyword refers to the surrounding object:

```javascript
let object = {
  label: "y",
  output(value) {
    console.log(`${this.label}=${value}`);
  },
};

label = "x";
object.output(13); // same as: object.output.call(object, 13);
```

Output:

    y=13

However, if the method is called outside of its object context, `this` refers to
the global object:

```javascript
let object = {
  label: "y",
  output(value) {
    console.log(`${this.label}=${value}`);
  },
};

label = "x";
let output = object.output;
output(13); // same as: output.call(global, 13);
```

Output:

    x=13

The `this` keyword can be bound explitly and persistently to an object using the
method's `bind` method:

```javascript
let object = {
  label: "y",
  output(value) {
    console.log(`${this.label}=${value}`);
  },
};

label = "x";
object.output = object.output.bind(object);
object.output(13);
let output = object.output;
output(13);
```

Output:

    y=13
    y=13

Now `output` being called as a stand-alone function also uses `object` as its
`this` reference: `this.label` has the value of `"y"` in both cases.

An arrow function returned from a method works differently in respect to its
`this` reference. Consider a following example, in which the function creating
the output is an arrow function being returned from a method:

```javascript
let object = {
  label: "y",
  getOutput() {
    return (value) => console.log(`${this.label}=${value}`);
  },
};
```

Depending on how the function is called, `this` refers to different objects:

```javascript
label = "x";

let outputReference = object.getOutput(); // invoked on object
outputReference(11);

let getOutput = object.getOutput;
let outputStandAlone = getOutput(); // invoked on global
outputStandAlone(11);
```

Output:

    y=11
    x=11

In the first usage, the `getOutput` is called in the context of `object`,
binding `this` to `object`. In the second usage, the `getOutput` method is
called in the global context, binding `this` to `global`.

An arrow functio has no `this` reference of its own! It instead works its way up
the scope until it finds a `this` reference instead—either reaching the
surrounding or the global object.


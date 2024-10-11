# Chapter 1

The `??` operator behaves mostly like the `||` operator, but only yields the
right-hand value if the left-hand value evaluates to `null` or `undefined`:

    > 0 || 13
    13
    > 0 ?? 13
    0

    > "" || "foo"
    "foo"
    > "" ?? "foo"
    ""

# Chapter 4

## Array Methods

| Side/Operation | Start     | End    |
|----------------|-----------|--------|
| Add            | `unshift` | `push` |
| Remove         | `shift`   | `pop`  |

## `Object`

`Object.keys` lists alls properties of an object, which can be accessed using
the index operator `[]` with the respective key:

```javascript
let person = {
  firstName: "Patrick",
  lastName: "Bucher",
  yearOfBirth: 1987,
  heightInCm: 188,
  weightInKg: 76.0,
};

for (const key of Object.keys(person)) {
  const value = person[key];
  console.log(`${key}:\t${value}`);
}
```

Output:

    firstName:	    Patrick
    lastName:	    Bucher
    yearOfBirth:	1987
    heightInCm:	    188
    weightInKg:	    76

A property can be removed from an object using the `delete` keyword:

```javascript
delete person.heightInCm;
delete person.weightInKg;
```

Properties can be copied into an object from another object using
`Object.assign`:

```javascript
Object.assign(person, { profession: "Programmer", country: "Switzerland" });
```

## Loops

Unlike other programming languages, looping over the elements of an array is
_not_ done with `for`/`in` but with `for`/**`of`**:

```javascript
for (let i of [1, 2, 3]) {
  console.log(i);
}
```

## Rest Parameters

Functions can accept a variable number of arguments as _rest parameters_:

```javascript
function sum(...numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}
```

Such functions can be called either using stand-alone arguments:

```javascript
sum(1, 2, 3, 4);
```

Or by turning an array into rest parameters:

```javascript
const numbers = [1, 2, 3, 4];
sum(...numbers);
```

This technique can also be used to nest arrays:

```javascript
const numbers = [4, 5, 6];
const moreNumbers = [1, 2, 3, ...numbers, 7, 8, 9];
console.log(moreNumbers);
```

Output:

    [1, 2, 3, 4, 5, 6, 7, 8, 9]

Or with objects:

```javascript
const physique = {
  weightKg: 76.0,
  heightCm: 188,
};

const name = {
  firstName: "Patrick",
  lastName: "Bucher",
};

const combined = {
  age: 36,
  ...name,
  ...physique,
  country: "Switzerland",
};

console.log(combined);
```

Output:

    {
      age: 36,
      firstName: "Patrick",
      lastName: "Bucher",
      weightKg: 76,
      heightCm: 188,
      country: "Switzerland"
    }

# Chapter 6

All objects are based on a prototype:

    > Object.getPrototypeOf([1, 2, 3]) === Array.prototype
    true
    > Object.getPrototypeOf({a: 1, b: "foo"}) === Object.prototype
    true

Use `instanceof` to check for a type:

    > [1, 2, 3] instanceof Array
    true
    > {a: 1, b: 2} instanceof Object
    true

# Chapter 9

To match unicode characters, use the suffix `/u` and the following patterns to
match…

- `\p{L}`: letters
- `\p{N}`: numeric characters
- `\p{P}`: punctuation characters
- `\P{L}`: nonletter
- `\p{Script=SCRIPT}`: character of a given script

Examples:

    > /\w{3}/u.test('ABC')
    true
    > /\w{3}/u.test('ЯБГ')
    false

    > /\p{L}+/u.test('ABC')
    true
    > /\p{L}+/u.test('ЯБГ')
    true

    > /\p{Script=Cyrillic}+/u.test('Ялта')
    true
    > /\p{Script=Cyrillic}+/u.test('Jalta')
    false

Use the following methods together with regular expressions, which return…

- `RegExp.test(String)`: Boolean (match or mismatch)
- `RegExp.execute(String)`: Array of Matches
- `String.replace(RegExp, String/Function)`: String with replacements applied
- `String.search(RegExp)`: Number (start index of matching regular expression)

There are different options that can be combined:

- `/g`: global
- `/i`: case-insentitive
- `/u`: Unicode
- `/y`: sticky (no lookahead)

# Chapter 10

ECMAScript Modules (_ES Modules_) can `export` bindigs (classes, functions,
constants) to make them avavailable for `import` in other modules.

Given a module `weekdays.js`:

```javascript
const names = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function getName(date) {
  return names[date.getDay()];
}

export function getDay(name) {
  return names.indexOf(date.getDay());
}
```

The module `today.js` can use its functionality as follows:

```javascript
import { getName } from "./weekdays.js";

const now = new Date();
const day = getName(now);
console.log(`Today is ${day}.`);
```

The way modules are resolved depends on the platform (file system paths on
Node.js and Deno, web addresses in the browser).

The `export` statement can only be used on top-level declarations, not inside
blocks.

## Alias Imports

A binding can be imported under an alias name using `as`:

```javascript
import { getName as getWeekDayName } from "./weekdays.js";

const now = new Date();
const day = getWeekDayName(now);
console.log(`Today is ${day}.`);
```

## Default Exports

If a module only exports a single binding, this can be done using the `default`
keyword (`factorial.js`):

```javascript
export default function factorial(n) {
  if (n < 0) {

    throw new Error(`cannot compute factorial of a negative number ${n}`);
  } else if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
```

The `factorial` function can be imported under any name as follows:

```javascript
import fac from "./factorial.js";

const x = 10;
const y = fac(x);
console.log(`!${x}=${y}`);
```

## CommonJS Modules

Node.js introduced its own module system, _CommonJS_, which uses `require` to
import other modules and uses `exports` to define the bindings to be exposed.
Since Node.js also supports ES Modules, new projects should rather use ES
Modules instead of CommonJS modules.

# Chapter 11

## `Promise`

`Promise.resolve(value)` wraps the `value` in a `Promise`. If `value` is already
a `Promise`, it is simply returned.

`new Promise(resolve)` creates a new `Promise` that immediately runs the
function it is passed to. This function's `resolve` argument is itself a
function that resolves into a value.

The `then` method handles the resolved value and itself returns a `Promise`.

```javascript
let p = new Promise(resolve => resolve(42));
p.then(value => console.log(value)); // 42
p.then(console.log); // same
```

Multiple `then` calls can be chained as a pipeline:

```javascript
let x = 2;
let y = new Promise((resolve) => resolve(x))
  .then((x) => x + 2) // 4
  .then((x) => x * 2) // 8
  .then((x) => x - 2) // 6
  .then((x) => x / 2) // 3
  .then(console.log);
```

A `Promise` can be _resolved_ (resulting in a value) or _rejected_ (resulting in
an error). If an exception is thrown, the `Promise` produced by its `then` call
is rejected. The error is propagated through the entire chain of `then` calls.

A rejected `Promise` can be created using `Promise.reject()`.

Both resolved and rejected promises can be handled alongside:

```javascript
function applyOpsWithTwo(x) {
  new Promise((resolve, reject) => {
    const parsed = Number.parseFloat(x);
    if (Number.isNaN(parsed)) {
      reject(new Error(`${x} cannot be parsed as float`));
    } else {
      resolve(parsed);
    }
  }).then((x) => x + 2)
    .then((x) => x * 2)
    .then((x) => x - 2)
    .then((x) => x / 2)
    .then((result) => console.log(`result: ${result}`))
    .catch((reason) => console.log(`error: ${reason}`));
}

applyOpsWithTwo(" 13.2 ");
applyOpsWithTwo("-OooO-");
```

Output:

    result: 14.2
    error: Error: -OooO- cannot be parsed as float

Multiple promises can be turned into a single promise using the static
`Promise.all` method:

```javascript
function applyOps(x) {
  let plusTwo = new Promise((resolve, _) => resolve(x + 2));
  let minusTwo = new Promise((resolve, _) => resolve(x - 2));
  let timesTwo = new Promise((resolve, _) => resolve(x * 2));
  let divideByTwo = new Promise((resolve, reject) => {
    if (x != 0) {
      resolve(x / 2);
    } else {
      reject(new Error("divide by zero"));
    }
  });
  Promise.all([plusTwo, minusTwo, timesTwo, divideByTwo])
    .then((y) => console.log(`results: ${y}`))
    .catch((e) => console.log(`failed: ${e}`));
}

applyOps(3);
applyOps(0);
```

This `Promise` resolves into an array of results with its length corresponding
to the number of promises originally passed.

Output:

    results: 5,1,6,1.5
    failed: Error: divide by zero

## `async`/`await`

A function marked as `async` returns a `Promise`. This `Promise` is resolved,
when the function returns something; it is rejected, when the body throws an
exception.

Inside such a function, execution can be stopped until a `Promise` is resolved
using the `await` keyword.

```javascript
async function increment(x) {
  return x + 1;
}

async function square(x) {
  return x * x;
}

async function squaredIncrement(x) {
  let incremented = await increment(x);
  let squared = await square(incremented);
  return squared;
}

squaredIncrement(3).then(console.log);
```

The `squaredIncrement` function could also be written as:

```javascript
function squaredIncrement(x) {
  return increment(x).then(square);
}
```

## Generators

Generators are functions declared with `function*` and can make use of the
`yield` keyword, which returns a value and then continues the flow of the
function. Such a function actually returns an iterator, with `yield` returning
the next value of the iteration.

```javascript
function* fibs(n) {
  let a = 1, b = 1;
  for (let i = 0; i < n; i++) {
    yield a;
    let next = a + b;
    a = b;
    b = next;
  }
}

for (let fib of fibs(10)) {
  console.log(fib);
}
```

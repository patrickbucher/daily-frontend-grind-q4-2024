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

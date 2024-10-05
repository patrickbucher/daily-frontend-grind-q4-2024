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

## Using functions

Unlike many other languages, JavaScript does _not_ support function overloading.
In JavaScript, the last function defined with a name will be called. TypeScript,
being more strict, throws an error:

```typescript
function discount(amount: number, percentage: number): number {
  const factor = (100 - percentage) / 100.0;
  return amount * factor;
}

function discount(amount: number, value: number): number {
  return amount - value;
}
```

Output:

    src/index.ts(1,10): error TS2393: Duplicate function implementation.
    src/index.ts(6,10): error TS2393: Duplicate function implementation.

The issue can prevented using the following strategies:

1. Implement a single function that accepts both kinds of parameters. (Here: a
   percentage _and_ an absolute value to be discounted.)
2. Implement two functions with distinct names. (Here: a `discountPercentage`
   and a `discountAbsolute` function.)

The first approach makes the code harder to read, whereas the second approach
adds clarity by introducing more precise names.

In JavaScript, if too few arguments are passed to a function, the remainder
parameters have the value `undefined`. If too many arguments are passed, they
are collected in the `arguments` array.

TypeScript, however, is stricter than JavaScript and does _not_ allow a function
to be called with a different number of arguments.

```typescript
function discount(amount: number, percentage: number): number {
  const factor = (100 - percentage) / 100.0;
  return amount * factor;
}

console.log(discount(100, 5.0)); // same number of arguments
console.log(discount(100)); // too few arguments
console.log(discount(100, 5.0, 1)); // too many arguments
```

Output:

    src/index.ts(7,13): error TS2554: Expected 2 arguments, but got 1.
    src/index.ts(8,32): error TS2554: Expected 2 arguments, but got 3.

The `noUnusedParameters` compiler option can be activated to produce an error if
a function expects parameters that aren't actually used:

```json
{
  "compilerOptions": {
    …
    "noUnusedParameters": true
  }
}
```

In this example, the `absolute` parameter is expected, but never used:

```typescript
function discount(amount: number, percentage: number, absolute: number): number {
  const factor = (100 - percentage) / 100.0;
  return amount * factor;
}

console.log(discount(100, 5.0, 10.0));
```

Output:

    src/index.ts(1,55): error TS6133: 'absolute' is declared but its value is never read.

Optional parameters must be declared after the required parameters with the suffix `?`:

```typescript
function discount(
  amount: number,
  percentage: number,
  absolute?: number,
): number {
  const factor = (100 - percentage) / 100.0;
  if (absolute) {
    amount -= absolute;
  }
  return amount * factor;
}

console.log(discount(100, 5));
console.log(discount(100, 5, 10));
```

Output:

    95
    85.5

To avoid explicit checks whether or not an optional argument has been provided,
a fallback value can be used:

```typescript
function discount(
  amount: number,
  percentage: number,
  absolute?: number,
): number {
  const factor = (100 - percentage) / 100.0;
  return (amount - (absolute || 0)) * factor;
}
```

However, since a fallback value can be used, it can be provided using a
_default-initialized_ parameter, being declared without a question mark:

```typescript
function discount(
  amount: number,
  percentage: number,
  absolute: number = 0,
): number {
  const factor = (100 - percentage) / 100.0;
  return (amount - absolute) * factor;
}

console.log(discount(100, 5));
console.log(discount(100, 5, 10));
```

Even though the parameter `absolute` was declared _without_ a `?`, it sill is an
optional parameter and therefore needs to be listed after the required
parameters.

A variable number of arguments can be provided using a rest parameter, declared
using an ellipsis (`...`), which collects zero, one, or multiple arguments
provided after the optional parameters:

```typescript
function discount(
  amount: number,
  percentage: number,
  absolute: number = 0,
  ...fees: number[]
): number {
  const factor = (100 - percentage) / 100.0;
  const totalFees = fees.reduce((acc, e) => acc + e, 0);
  return (amount - absolute + totalFees) * factor;
}

console.log(discount(100, 5));
console.log(discount(100, 5, 10));
console.log(discount(100, 5, 10, 1));
console.log(discount(100, 5, 10, 1, 2));
console.log(discount(100, 5, 10, 1, 2, 3));
```

Output:

    95
    85.5
    86.45
    88.35
    91.19999999999999

If a function expecting a default-initialized parameter is called with the
argument `null`, its default value is used instead, as if the function had be
called without passing an argument for this default-initialized parameter.

The `strictNullChecks` compiler option disables the usage of `null` and
`undefined` without declaring the parameters using an according type union, e.g.
`number | null`. The possibility of `null` being passed then needs to be
accounted for programmatically:

```typescript
function discount(
  amount: number,
  percentage: number,
  absolute: number | null = 0,
): number {
  const factor = (100 - percentage) / 100.0;
  return (amount - absolute) * factor;
}

console.log(discount(100, 5, null));
```

Output:

    error TS18047: 'absolute' is possibly 'null'.

Which can be fixed using an explicit `null` check:

```typescript
function discount(
  amount: number,
  percentage: number,
  absolute: number | null = 0,
): number {
  const factor = (100 - percentage) / 100.0;
  if (absolute === null) {
    absolute = 0;
  }
  return (amount - absolute | 0) * factor;
}

console.log(discount(100, 5, null));
```

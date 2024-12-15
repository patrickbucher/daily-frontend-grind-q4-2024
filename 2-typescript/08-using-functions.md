# Using functions

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

If no return type is annotated for a function that returns values of different
types, the TypeScript compiler will automatically infer a type union for the
function's return type. If the `declaration` setting is enabled, the inferred
type unions can be seen in the according declarations file, e.g. in
`dist/index.d.ts` for the  code in `src/index.ts`. The `discount` function can
either return a `number` or a `string`, depending on the value of the `format`
parameter:

```typescript
function discount(amount: number, percentage: number, format: boolean) {
  const factor = (100 - percentage) / 100.0;
  const result = amount * factor;
  if (format) {
    return result.toFixed(2);
  }
  return result;
}
```

The return type is inferred as `string | number` in `dist/index.d.ts`:

```typescript
declare function discount(amount: number, percentage: number, format: boolean): string | number;
```

A JavaScript function that never explicitly returns a value using the `return`
keyword will return `undefined` implicitly when called. Implicit returns can be
prevented by enabling the `noImplicitReturns` compiler option in `tsconfig.json`:

```json
{
  "compilerOptions": {
    …
    "noImplicitReturns": true
  }
}
```

When activated, each execution path of a function must return a value
explicitly, otherwise the compiler throws an error:

```typescript
function greet(whom: string): string {
  if (whom !== "") {
    return `Hello, ${whom}!`;
  }
}
```

Output:

    error TS2366: Function lacks ending return statement and return type does not include 'undefined'.

Once an explicit return is introduced for the case that `whom` is the empty
string, the function will be compiled:

```typescript
function greet(whom: string): string {
  if (whom !== "") {
    return `Hello, ${whom}!`;
  }
  return "";
}
```

A function's return type can depend on the type of its parameters. However, this
relationship remains implicit and requires reading the code to be uncovered, as
in the following function:

```typescript
function multiply(x: number | string, y: number): number | string {
  if (typeof x === "number") {
    return x * y;
  }
  let result = "";
  for (let i = 0; i < y; i++) {
    result = `${result} ${x}`;
  }
  return result.trim();
}

console.log(multiply(3, 5));
console.log(multiply("oh", 5));
```

Output:

    15
    oh oh oh oh oh

A _type overload_ describes such a relationship using different function
declarations, expressing valid type combinations:

```typescript
function multiply(x: number, y: number): number;
function multiply(x: string, y: number): string;
function multiply(x: number | string, y: number): number | string {
  if (typeof x === "number") {
    return x * y;
  }
  let result = "";
  for (let i = 0; i < y; i++) {
    result = `${result} ${x}`;
  }
  return result.trim();
}

let product: number = multiply(3, 5);
let output: string = multiply("oh", 5);
console.log(product);
console.log(output);
```

When the function `multiply` is called with an argument of type `number` for the
parameter `x`, the compiler infers that the resulting value must be of type
`number`, too; no type assertion is needed when assigning the return value to a
variable of type `number`.

The `asserts` keyword indicates that a function performs a type assertion on a
parameter value, which either passes or throws an exception. Consider the
following function:

```typescript
function increment(x: number | null): number {
  return x + 1;
}
```

Which cannot be compiled:

    error TS18047: 'x' is possibly 'null'.

However, the code compiles when using an assert function:

```typescript
function increment(x: number | null): number {
  assertNotNull(x);
  return x + 1;
}

function assertNotNull(x: any): asserts x {
  if (x == null) {
    throw new Error("x is null");
  }
}
```

Assertions can also be used for specific types, e.g. to make sure that a
parameter is actually numeric:

```typescript
function increment(x: number | string | null): number {
  assertIsNumeric(x);
  return x + 1;
}

function assertIsNumeric(x: any): asserts x is number {
  if (typeof x != "number") {
    throw new Error("x is not numeric");
  }
}
```

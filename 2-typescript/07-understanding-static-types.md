# Understanding static types

The following code examples can be run in a project called `types`, similar to
the `tools` project from the above section.

In JavaScript, variables have no types, but values do. JavaScript's `typeof`
keyword returns the type of an expression's resulting value:

```typescript
console.log(`${typeof "hello"}`);
console.log(`${typeof 12.5}`);
console.log(`${typeof true}`);
console.log(`${typeof { some: "thing" }}`);
```

Output:

    string
    number
    boolean
    object

To restrict variables, function parameters, and function return values to
certain types, TypeScript supports _type annotations_:

```typescript
function discount(amount: number, percentage: number): number {
  const factor: number = (100 - percentage) / 100.0;
  const discounted: number = amount * factor;
  return discounted;
}

console.log(discount(50, 2.5));
```

The TypeScript compiler is able to infer the types of expressions. In this
example, the result is converted to a `string`:

```typescript
function discount(amount: number, percentage: number) {
  const factor: number = (100 - percentage) / 100.0;
  const discounted: number = amount * factor;
  return discounted.toFixed(2);
}

const originalPrice = 50;
const discountRate = 1.25;
const discountedPrice = discount(originalPrice, discountRate);
console.log(discountedPrice);
```

The `toFixed` method turns the `number` into a `string`, which is returned from
the `discount` function. Since no variable nor return types have been annotated,
the compiler has to figure out the types.

Extend the `tsconfig.json` file by adding the `declaration` setting:

```json
{
  "compilerOptions": {
    …
    "declaration": true
  }
}
```

This will create a file called `index.d.ts` alongside `index.js` in the dist
folder:

```typescript
declare function discount(amount: number, percentage: number): string;
declare const originalPrice = 50;
declare const discountRate = 1.25;
declare const discountedPrice: string;
```

This is helpful to reveal what types the compiler has inferred.

The `any` type can be used if _all_ types are allowed. In this case, the
programmer must take care that the types are used correctly, and the compiler
won't help. If no type parameters are provided, the TypeScript compiler fills in
`any` implicitly.

This implicit usage of `any` can be disabled using the `noImplicitAny` compiler
option in `tsconfig.json`:

```json
{
  "compilerOptions": {
    …
    "noImplicitAny": true
  }
}
```

If different types are acceptable for a variable or function argument, the
allowed types can be narrowed down using a _type union_ rather than just
allowing `any` type.

A type union is a list of types, separated by a bar, e.g. `string | number` to
allow both strings and numeric values.

The discount example from before is extended using a flag indicating whether or
not the result shall be formatted as a currency string, either returning a
`string` or a `number`.

```typescript
function discount(
  amount: number,
  percentage: number,
  format: boolean,
): string | number {
  const factor: number = (100 - percentage) / 100.0;
  const discounted: number = amount * factor;
  if (format) {
    return `$${discounted.toFixed(2)}`;
  }
  return discounted;
}

const originalPrice = 50;
const discountRate = 1.25;
const discountedPrice = discount(originalPrice, discountRate, true);
console.log(discountedPrice);
```

The operations allowed on the `discountedPrice` variable are the intersection of
operations allowed on the `string` and on the `number` type, i.e. only
`toString()` is allowed.

If the programmer knows more than the compiler, a _type assertion_ using the
`as` keyword can be used to make sure TypeScript treats a variable as having a
specific type. Using the `discount` function from above:

```typescript
const discountedPriceFormatted: string = discount(99.9, 5.0, true) as string;
const discountedPriceRaw: number = discount(99.9, 5.0, false) as number;
console.log(discountedPriceFormatted, discountedPriceRaw.toFixed(2));
```

Notice that no conversion is performed by using the `as` keyword; instead,
TypeScript uses this information to determine which operations are allowed on
the variables.

A different approach is to use _type guards_ using the `typeof` JavaScript keyword:

```typescript
const discountedPrice = discount(99.9, 5.0, false);
if (typeof discountedPrice === "string") {
  console.log(discountedPrice);
} else if (typeof discountedPrice === "number") {
  console.log(`$${discountedPrice.toFixed(2)}`);
}
```

The TypeScript compiler figures out that in the second branch, `discountedPrice`
is a number, therefore permitting the usage of its `toFixed` method.

The `never` type can be used to ensure that type guards are being used
exhaustively, i.e. that no type remains unhandled:

```typescript
const discountedPrice = discount(99.9, 5.0, false);
if (typeof discountedPrice === "string") {
  console.log(discountedPrice);
} else if (typeof discountedPrice === "number") {
  console.log(`$${discountedPrice.toFixed(2)}`);
} else {
  let impossible: never = discountedPrice;
  console.log(`unexpected type for value ${impossible}`);
}
```

If the `discount` function were to be declared with the type `string | number |
object`, the assignment of `discountedPrice` to `impossible` _would_ actually
happen, causing an error.

Unlike `any`, the type `unknown` can only be assigned to another type together
with a type assertion. The following code using `any` compiles:

```typescript
const discounted: any = discount(99.9, 5.0, false);
const discountedPrice: number = discounted;
console.log(discountedPrice);
```

When using `unknown` instead of `any` instead, this code would fail:

```typescript
const discounted: unknown = discount(99.9, 5.0, false);
const discountedPrice: number = discounted;
console.log(discountedPrice);
```

Error:

    error TS2322: Type 'unknown' is not assignable to type 'number'.

It works however together with a type assertion:

```typescript
const discounted: unknown = discount(99.9, 5.0, false);
const discountedPrice: number = discounted as number;
console.log(discountedPrice);
```

Since the values `null` and `undefined` are legal values for all types, the
TypeScript compiler won't complain when using them:

```typescript
function discount(
  amount: number,
  percentage: number,
  format: boolean,
): string | number {
  if (amount == 0.0) {
    return null;
  }
  const factor: number = (100 - percentage) / 100.0;
  const discounted: number = amount * factor;
  if (format) {
    return `$${discounted.toFixed(2)}`;
  }
  return discounted;
}

const discountedPrice: string | number = discount(99.9, 5.0, false);
console.log(discountedPrice);
```

This behaviour can be changed by activating _strict null checks_ in
`tsconfig.json`:

```json
{
  "compilerOptions": {
    …
    "strictNullChecks": true
  }
}
```

The code from above now cuases this error:

    Type 'null' is not assignable to type 'string | number'.

The `null` type has to be included in the type union so that the program
compiles and runs again:

```typescript
function discount(
  amount: number,
  percentage: number,
  format: boolean,
): string | number | null {
  if (amount == 0.0) {
    return null;
  }
  const factor: number = (100 - percentage) / 100.0;
  const discounted: number = amount * factor;
  if (format) {
    return `$${discounted.toFixed(2)}`;
  }
  return discounted;
}

const discountedPrice: string | number | null = discount(99.9, 5.0, false);
console.log(discountedPrice);
```

Note that `typeof null` returns `"object"`, so the variable `discountedPrice` in
the example above needs to be compared to the _value_ `null`; a type guard won't
help.

If the value `null` cannot be returned, i.e. by passing an `amount` argument not
equal to `0.0` in the example above—the programmer knows more than the
compiler—a _non-null assertion_ can be applied, which is a `!` character after
the expression producing a non-`null` value:

```typescript
const discountedPrice: string | number = discount(99.9, 5.0, false)!;
console.log(discountedPrice);
```

Note that the type `null` is still part of the function's type union, but no
longer of the variable's.

The  also uses the `!` character, but right
after the variable's name.

If the compiler cannot detect the assignment of a value to a variable, but the
programmer is sure there _is_ a value assigned, the _definitive assignment
assertion_ (also using the `!` character, but right after the variable's name)
can be used to prevent compilation errors.

This code fails to compile:

```typescript
let percentage: number;
eval("percentage = 5.0;");
const discountedPrice: string | number = discount(99.9, percentage, false)!;
console.log(discountedPrice);
```

Error:

    Variable 'percentage' is used before being assigned.

The TypeScript compiler cannot peek inside the `eval` function, but the
programmer can:

```typescript
let percentage!: number;
eval("percentage = 5.0;");
const discountedPrice: string | number = discount(99.9, percentage, false)!;
console.log(discountedPrice);
```


## Using arrays, tuples, and enums

TypeScript allows to restrict the types of the elements an array can cake up
using type annotations:

```typescript
const names: string[] = ["Dilbert", "Alice", "Wally"];
const ages: number[] = [42, 37, 53];
```

A type union must be placed within parentheses:

```typescript
const measurements: (number | string)[] = [97, 37, "cold"];
```

Written as `number | string[]` (i.e. without parentheses), the type union would
denote the type to be either a single number or an array of strings; hence the
parentheses around the type union.

Note: Such a type union means that _each_ element of an array can be either a
`number` or a `string`, and not that _all_ elements have to bei either numbers
or strings. Therefore, values of different types can be mixed in the array.

The TypeScript compiler infers type unions for arrays based on the values being
used upon initialization:

```typescript
const values = [13, "hello", 42];
```

When the `declaration` compiler option is activated, the following declarations
are produced (`dist/index.d.ts`):

```typescript
declare const values: (string | number)[];
```

If an array is initialized empty, the type `any` is inferred:

```typescript
const values = [];
```

Declarations:

```typescript
declare const values: any[];
```

### Tuples

Tuples are fixed-length arrays, in which every element can have a different
type. Under the hood, tuples are implemented as regular JavaScript arrays:

```typescript
let dilbert: [string, number] = ["Dilbert", 42];
let alice: [string, number] = ["Alice", 37];
let wally: [string, number] = ["Wally", 53];

let engineers: [string, number][] = [dilbert, alice, wally];
```

A type annotation is always required for tuples, otherwise they would be treated
as regular arrays. Tuples can be used together with JavaScript's array features,
such as accessing individual elements using square brackets and an index.

Optional elements (following non-optional elements) are supported using the `?`
suffix, turning the type of such al element to a type union with `undefined`,
e.g. `number?` becomes `number | undefined`.

Tuples can also use rest elements, making the number of elements more
flexible—and thereby defeating the point of tuples.

Consider the following example in which an optional element denotes the best
friend, and the rest parameters denote more friends:

```typescript
let dilbert: [string, number, string?, ...string[]] = ["Dilbert", 42];
let alice: [string, number, string?, ...string[]] = ["Alice", 37, "Amy"];
let wally: [string, number, string?, ...string[]] = ["Wally", 53, "Ashok", "Boss", "Joe"];

let engineers: [string, number, string?, ...string[]][] = [dilbert, alice, wally];
```

The type declarations look as follows:

```typescript
declare let dilbert: [string, number, string?, ...string[]];
declare let alice: [string, number, string?, ...string[]];
declare let wally: [string, number, string?, ...string[]];
declare let engineers: [string, number, string?, ...string[]][];
```

### Enums

Enums are groups of fixed values that can be accessed by a name. An enum can be
declared using the `enum` keyword:

```typescript
enum Position {
  Engineer,
  Manager,
  Trainee,
}

let employees: [string, Position][] = [
  ["Dilbert", Position.Engineer],
  ["Pointy-Haired Boss", Position.Manager],
  ["Ashok", Position.Trainee],
];

employees.forEach((employee: [string, Position]) => {
  switch (employee[1]) {
    case Position.Engineer:
      console.log(`${employee[0]} works on the product.`);
      break;
    case Position.Manager:
      console.log(`${employee[0]} manages the team.`);
      break;
    case Position.Trainee:
      console.log(`${employee[0]} lends a helping hand.`);
      break;
  }
});
```

The label can be accessed as a `string` using square bracket notation:

```typescript
enum Position {
  Engineer = 1,
  Manager = 2,
  Trainee = 3,
}

let position: Position = Position.Engineer;
let label: string = Position[position];
console.log(label);
```

Output:

    Engineer

Enums are implemented by the TypeScript compiler, which automatically assigns a
`number` value to every name, as shown in the declarations file:

```typescript
declare enum Position {
  Engineer = 0,
  Manager = 1,
  Trainee = 2,
}
declare let employees: [string, Position][];
```

The numbers can be assigned manually. It's a good practice to either assign
numbers manually to either all or none of the names to avoid duplications. The
first enum `Position` defines numbers for all names, the second enum `State`
defines numbers only for two names:

```typescript
enum Position {
  Engineer = 1,
  Manager = 2,
  Trainee = 3,
}

enum State {
  Waiting,
  Running = 3,
  Sleeping,
  Starting,
  Stopping = 4,
}
```

The names with missing values are enumerated automatically, which fails in the
second case, as the declaration shows:

```typescript
declare enum Position {
    Engineer = 1,
    Manager = 2,
    Trainee = 3
}
declare enum State {
    Waiting = 0,
    Running = 3,
    Sleeping = 4,
    Starting = 5,
    Stopping = 4
}
```

Both `State.Sleeping` and `State.Stopping` have the value `4`, which creates a
conflict:

```typescript
console.log(State.Sleeping == State.Stopping);
```

Output:

    true

This is clearly not what the programmer intended.

It's possible to use `string` instead of `number` values:

```typescript
enum Country {
  Switzerland = "CH",
  Germany = "DE",
  France = "FR",
}

console.log(Country.Switzerland);
```

Output:

    CH

Two distinct enums cannot be compared to one another, even if they share the
underlying values:

```typescript
enum Institution {
  Insurance,
  Bank,
  Court,
}

enum Furniture {
  Chair,
  Bank,
  Table,
}

console.log(Institution.Bank == Furniture.Bank);
```

Output:

    error TS2367: This comparison appears to be unintentional because the types 'Institution' and 'Furniture' have no overlap.

Enums are implemented as JavaScript objects, unless they are declared using the
`const` keyword, in which case all the references to an enum are inlined.
However, const enums cannot be accessed using their labels:

```typescript
const enum State { Running, Sleeping, Waiting, Starting, Stopping }

let state: State = State.Waiting;
let label: string = State[state];
```

Output:

    error TS2476: A const enum member can only be accessed using a string literal.
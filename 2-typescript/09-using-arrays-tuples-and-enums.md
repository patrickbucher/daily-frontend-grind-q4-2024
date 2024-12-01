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

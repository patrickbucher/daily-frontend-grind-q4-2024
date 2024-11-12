# Essential TypeScript 5 (3rd Edition)

## Understanding TypeScript

TypeScript is a superset of JavaScript. It adds static typing to produce safe
and predictable code. It also provides convenience features such as a concise
class constructor syntax, and access control keywords. Some TypeScript features
are implemented entirely by the compiler,leaving no trace of TypeScript in the
resulting JavaScript code.

Working effectively with TypeScript requires understanding JavaScript and its
type system. TypeScript allows using modern language features in code that is
transformed for execution in older JavaScript runtimes, although not every new
feature can be translated to older runtimes.

## Your first TypeScript application

The TypeScript compiler `tsc` can be installed using the Node Package Manager
(NPM), which is distributed with Node.js. Install it from
[nodejs.org](https://nodejs.org) and make sure to run Node version 18 and NPM
version 8 or later:

    $ node --version
    v23.1.0
    $ npm --version
    10.9.0

The TypeScript compiler can be installed (globally, i.e. for all of the current
user's projects) in a specific version, e.g. 5.6.3 as follows:

    $ npm install npm install --global typescript@5.6.3
    $ tsc --version
    Version 5.6.3

It's also recommended to install Git from [git-scm.org](https://git-scm.org) and
a programmer's text editor such as Visual Studio Code from
[code.visualstudio.com](https://code.visualstudio.com).

To create a new project (e.g. `race`), create a folder, navigate into it, and
initialize a Node.js project with default settings:

    $ mkdir race
    $ cd race
    $ npm init --yes

A file `package.json` has been created, which keeps track of the project's
settings and package dependencies.

Tye TypeScript code shall be placed in the `src/` subfolder and be copiled to
pure JavaScript code into the `dist/` subfolder. Create a file `tsconfig.json`
for this purpose:

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "outDir": "./dist",
    "rootDir": "./src",
    "module": "CommonJS"
  }
}
```

This configuration produces JavaScript code according to the ECMAScript2023
specification. The `module` setting defines which module system is being used in
the _emitted_ JavaScript code, not the module system being used in the
TypeScript code! CommonJS is used here, because the resulting code shall be run
in Node.js.

The main code file is commonly named `index.ts`, which is to be placed into the
`src/` folder:

```typescript
console.clear();
console.log("Hello, World!");
```

To compile the program, run the `tsc` command:

    $ tsc

This produces a file `dist/index.js` that can be run by Node.js:

    $ node dist/index.js
    Hello, World!

### Demo Application: Drivers in a Race

As an example application, multiple drivers entering a race shall be modeled in
TypeScript. The driver is represented as a class called `Driver`, which is
defined in `driver.ts`:

```typescript
export class Driver {
  public id: number;
  public name: string;
  public retired: boolean = false;

  public constructor(id: number, name: string, retired: boolean = false) {
    this.id = id;
    this.name = name;
    this.retired = retired;
  }

  public describe(): string {
    return `${this.id}\t${this.name}\t${this.retired ? "[r]" : "[ ]"}`;
  }
}
```

This code uses features that are not available in JavaScript:

- Fields (`id`, `name`, `retired`) and methods (`describe`) are annotated with a
  type (`number`, `string`, `boolean`), which is written as a suffix after the
  colon `:`.
- Fields and methods also have access modifiers (`public`).

TypeScript provides a shorter syntax to initialize the fields of a class that
are passed to its constructor. The `Driver` class can be writter more concisely
without loosing any functionality as follows:

```typescript
export class Driver {
  // no additional field declaration required

  public constructor(
    public id: number,
    public name: string,
    public retired: boolean = false,
  ) {
    // no manual initialization required
  }

  public describe(): string {
    return `${this.id}\t${this.name}\t${this.retired ? "[r]" : "[ ]"}`;
  }
}
```

The field declaration and initialization is automatically handled by the
constructor, whose parameters now also come with access modifiers. The default
access modifier is `public`, but here it must be defined for the constructor
parameters so that the compiler detects that concise constructor syntax is being
used.

Multiple drivers shall be put together in a container class called `Race`, which
is defined in `race.ts`:

```typescript
import { Driver } from "./driver";

export class Race {
  private nextId: number = 0;

  constructor(
    public track: string,
    public laps: number,
    public drivers: Driver[] = [],
  ) {}

  addDriver(name: string, retired: boolean = false): number {
    const maxId = Math.max(...this.drivers.map((d) => d.id));
    const newId = maxId + 1;
    this.drivers.push(new Driver(newId, name, retired));
    this.nextId = newId + 1;
    return newId;
  }

  getDriverById(id: number): Driver {
    return this.drivers.find((d) => d.id === id);
  }

  markRetired(id: number, retired: boolean) {
    const driver = this.getDriverById(id);
    if (driver) {
      driver.retired = retired;
    }
  }
}
```

The drivers are stored in an array that is annotated with the type `Driver[]`—an
array of drivers.

Those two classes—`Driver` and `Race`—can interact together as shown in
`index.ts`:

```typescript
import { Driver } from "./driver";
import { Race } from "./race";

const drivers = [
  new Driver(1, "Freddie Fuel"),
  new Driver(2, "Eddie Engine"),
  new Driver(3, "Walter Wheel"),
];
const race = new Race("Detroit City Speedwary", 48, drivers);

const lateEntrantId = race.addDriver("Tommy Tardy");
const lateEntrant = race.getDriverById(lateEntrantId);

const crashed = race.getDriverById(2);
race.markRetired(crashed.id, true);

for (const driver of race.drivers) {
  console.log(driver.describe());
}
```

Which produces the following output:

    $ tsc && node dist/index.js
    1	Freddie Fuel	[ ]
    2	Eddie Engine	[r]
    3	Walter Wheel	[ ]
    4	Tommy Tardy     [ ]

There are no type annotations used in the code of `index.ts`. The TypeScript
compiler is able to infer the proper types by the context. However, the code can
be made easier to read by providing additional type annotations. The programmer
can decide to what extent type annotations shall be used to give both the
compiler and other programmers hints on the types being used.

The code of `index.ts` can be rewritten as follows with additional type
annotations:

```typescript
import { Driver } from "./driver";
import { Race } from "./race";

const drivers: Driver[] = [
  new Driver(1, "Freddie Fuel"),
  new Driver(2, "Eddie Engine"),
  new Driver(3, "Walter Wheel"),
];
const race: Race = new Race("Detroit City Speedwary", 48, drivers);

const lateEntrantId: number = race.addDriver("Tommy Tardy");
const lateEntrant: Driver = race.getDriverById(lateEntrantId);

const crashed: Driver = race.getDriverById(2);
race.markRetired(crashed.id, true);

for (const driver of race.drivers) {
  console.log(driver.describe());
}
```

Instead of storing the drivers in an array and looking them up by filtering for
their `id`, storing them in a `Map` will make the lookup easier and faster. The
values of `driverMap` can be filtered like an array (`race.ts`):

```typescript
import { Driver } from "./driver";

export class Race {
  private driverMap = new Map<number, Driver>();

  constructor(
    public track: string,
    public laps: number,
    drivers: Driver[] = [],
  ) {
    drivers.forEach((d) => this.driverMap.set(d.id, d));
  }

  addDriver(name: string, retired: boolean = false): number {
    const maxId = Math.max(...this.driverMap.keys());
    const newId = maxId + 1;
    this.driverMap.set(newId, new Driver(newId, name, retired));
    return newId;
  }

  getDriverById(id: number): Driver {
    return this.driverMap.get(id);
  }

  markRetired(id: number, retired: boolean) {
    const driver = this.getDriverById(id);
    if (driver) {
      driver.retired = retired;
    }
  }

  getDrivers(includeRetired: boolean): Driver[] {
    return [...this.driverMap.values()].filter(
      (d) => !d.retired || includeRetired,
    );
  }
}
```

The otherwise dynamic types of a JavaScript `Map` are restricted for `driverMap`
with the type parameter `number` for keys and `Driver` for values, which are
defined in angle brackets. Those type hints allow the compiler to know and check
the value type of the `Map`: `Driver`, which has a field `retired` of type
`boolean`.

Retired drivers can be removed from the map by adding the method
`removeRetired` (`race.ts`):

```typescript
removeRetired() {
  this.driverMap.forEach((d) => {
    if (d.retired) {
      this.driverMap.delete(d.id);
    }
  });
}
```

The types of object literals can be described using an object's _shape_: a
combination of the property names and types, which can be declared as a new
`type` alias:

```typescript
type DriverCounts = {
  total: number;
  active: number;
};
```

A method to return those counts can be annotated with `DriverCounts` as its
return type:

```typescript
getDriverCounts(): DriverCounts {
  return {
    total: this.driverMap.size,
    active: this.getDrivers(false).length,
  };
}
```

Those new features can be used as follows (`index.ts`):

```typescript
import { Driver } from "./driver";
import { Race } from "./race";

const drivers: Driver[] = [
  new Driver(1, "Freddie Fuel"),
  new Driver(2, "Eddie Engine"),
  new Driver(3, "Walter Wheel"),
];
const race: Race = new Race("Detroit City Speedwary", 48, drivers);

const lateEntrantId: number = race.addDriver("Tommy Tardy");
const lateEntrant: Driver = race.getDriverById(lateEntrantId);

const crashed: Driver = race.getDriverById(2);
race.markRetired(crashed.id, true);

race.getDrivers(false).forEach((d) => console.log(d.describe()));
console.log(race.getDriverCounts(), "before removing retired");
race.removeRetired();
console.log(race.getDriverCounts(), "after removing retired");
```

Output:

    1	Freddie Fuel	[ ]
    3	Walter Wheel	[ ]
    4	Tommy Tardy	    [ ]
    { total: 4, active: 3 } before removing retired
    { total: 3, active: 3 } after removing retired

### Using a third-party package

TypeScript allows using any JavaScript package with additional static type
support. In order to make use of ECMAScript modules, which is the common
standard for modules by now, the Node.js project configuration file
`package.json` has to be extended by the following setting:

```json
"type": "module"
```

The TypeScript compiler settings in `tsconfig.json` have to be modified
accordingly, so that the module system defined by the Node.js project is
considered:

```json
"module": "Node16"
```

The way in wh ich Node.js implements ECMAScript modules requires to use the
`.js` (_not_ `.ts`!) extension for imports, e.g. in `race.ts`:

```typescript
import { Driver } from "./driver.js";
```

This has to be understood as a reference to the compiled JavaScript file as
opposed to the original TypeScript source code file.

The existing application shall be extended by the
[Inquirer.js](https://www.npmjs.com/package/inquirer) library to provide
interactive menus. Pure JavaScript libraries can be installed into a TypeScript
project as in a plain JavaScript project:

```bash
npm install inquirer@9.1.4
```

The library can be imported as follows in `index.js`:

```typescript
import inquirer from "inquirer";
```

Since the Inquirer.js project doesn't provide any type information, the
TypeScript compiler cannot check its proper usage concerning data types. There
are,  however, two ways in which such type information can be provided still:
First, to describe the types yourself; and second, to use existing type
declarations from the
[Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) project—a repository
of type declarations for many JavaScript packages. Such type declarations can be
installed as a development dependency as follows (in a slightly different
version, though):

```bash
npm install --save-dev @types/inquirer@9.0.5
```

The Inquirer.js package shall be used to implement an interactive menu. This
menu provides different options using different kinds of prompts, e.g. to enter
additional drivers to a race, or to mark drivers as retired, which then can be
purged from the list.

Each command is represented as an entry in an `enum`, which is a TypeScript
feature to group related constants together:

```typescript
enum Commands {
  Add = "Add New Driver",
  Retire = "Retire a Driver",
  Toggle = "Show/Hide Retired Drivers",
  Purge = "Remove Retired Drivers",
  Quit = "Quit",
}
```

The menu is run by the `promptUser` function, which dispatches individual
commands to their respective prompt function—or performs the action on its own:

```typescript
function promptUser(): void {
  console.clear();
  displayDrivers();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose Option",
      choices: Object.values(Commands),
    })
    .then((answers) => {
      switch (answers["command"]) {
        case Commands.Toggle:
          showRetired = !showRetired;
          promptUser();
          break;
        case Commands.Add:
          promptAdd();
          break;
        case Commands.Retire:
          if (race.getDriverCounts().active > 0) {
            promptRetire();
          } else {
            promptUser();
          }
          break;
        case Commands.Purge:
          race.removeRetired();
          promptUser();
          break;
      }
    });
}
```

The `inquirer.prompt` function shows a prompt that is configured using a
JavaScript object with the following properties:

- `type: "list"`: shows the provided `choices` (see below) as an interactive
  menu
- `name: "commands"`: assigns a name to the property that will hold the user's
  choice
- `message: "Choose Option"`: is the actual prompt being shown to the user
- `choices: Object.values(Commnds)`: provides the options for the user to select
  from a list

The other prompt functions use a different `type` together with different
options for their user interaction:

```typescript
function promptAdd(): void {
  console.clear();
  inquirer
    .prompt({
      type: "input",
      name: "add",
      message: "Enter Driver: ",
    })
    .then((answers) => {
      if (answers["add"] !== "") {
        race.addDriver(answers["add"]);
      }
      promptUser();
    });
}

function promptRetire(): void {
  console.clear();
  inquirer
    .prompt({
      type: "checkbox",
      name: "retired",
      message: "Retire Driver: ",
      choices: race
        .getDrivers(showRetired)
        .map((driver) => ({
          name: driver.name,
          value: driver.id,
          checked: driver.retired,
        })),
    })
    .then((answers) => {
      let retiredDrivers = answers["retired"] as number[];
      race
        .getDrivers(true)
        .forEach((driver) =>
          race.markRetired(
            driver.id,
            retiredDrivers.find((id) => id === driver.id) != undefined,
          ),
        );
      promptUser();
    });
}
```

Since the compiler cannot figure out the type of `answers["retired"]`, the _type
assertion_ `as number[]` is used to explicitly tell the compiler that an array
of numbers is being used.

The list of drivers is shown using the `displayDrivers` function:

```typescript
function displayDrivers(): void {
  console.log(
    `Race at ${race.track} over ${race.laps} laps. ` +
      `${race.getDriverCounts().active} drivers active.`,
  );
  race
    .getDrivers(showRetired)
    .forEach((driver) => console.log(driver.describe()));
}
```

### Adding Persistence

The application shall be extended with persistent storage of the data. For this
purpose the Lowdb package shall be used, which stores data in JSON files. Even
though this is a pure JavaScript package, it supplies type information:

```bash
npm install lowdb@5.1.0
```

Persistence shall be added by the means of inheritance: The `Race` class—with
its various operations that manipulate the data—is extended to synchronize the
changes with the JSON database on the disk. Currently, `driverMap` is declared
as `private`, preventing sub-classes from accessig it. To allow this access,
`driverMap` has to be declared as `protected` (`race.ts`):

```typescript
protected driverMap = new Map<number, Driver>();
```

The new sub-class `PersistentRace` then can be implemented as follows
(`persistentRace.ts`):

```typescript
import { Driver } from "./driver.js";
import { Race } from "./race.js";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

type schemaType = {
  drivers: {
    id: number;
    name: string;
    retired: boolean;
  }[];
};

export class PersistentRace extends Race {
  private database: LowSync<schemaType>;

  constructor(
    public track: string,
    public laps: number,
    drivers: Driver[] = [],
  ) {
    super(track, laps, []);
    this.database = new LowSync(new JSONFileSync("race.json"));
    this.database.read();
    if (this.database.data == null) {
      this.database.data = { drivers: drivers };
      this.database.write();
      drivers.forEach((driver) => this.driverMap.set(driver.id, driver));
    } else {
      this.database.data.drivers.forEach((driver) =>
        this.driverMap.set(
          driver.id,
          new Driver(driver.id, driver.name, driver.retired),
        ),
      );
    }
  }

  addDriver(name: string, retired: boolean = false): number {
    let result = super.addDriver(name, retired);
    this.storeDrivers();
    return result;
  }

  markRetired(id: number, retired: boolean): void {
    super.markRetired(id, retired);
    this.storeDrivers();
  }

  removeRetired(): void {
    super.removeRetired();
    this.storeDrivers();
  }

  private storeDrivers() {
    this.database.data.drivers = [...this.driverMap.values()];
    this.database.write();
  }
}
```

The schema used for storing the data persistently is defined using a `type`
called `schemaType`, which describes the shape of the object to be stored: an
array of drivers.

The extended implementation can be used as follows (`index.ts`):

```typescript
import { PersistentRace } from "./persistentRace.js";

const race: PersistentRace = new PersistentRace("Detroit City Speedwary", 48, drivers);
```

The data is then stored persistently in a file called `race.json`.

## JavaScript primer, part 1

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

### Type Coercion

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

### Functions

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

### Arrays

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

### Objects

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

#### `this`

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

## JavaScript primer, part 2

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

### Constructor Functions and Prototype Chaining

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

### Classes

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

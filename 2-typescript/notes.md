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

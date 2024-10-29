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
    "target": "ES2022",
    "outDir": "./dist",
    "rootDir": "./src",
    "module": "CommonJS"
  }
}
```

This configuration uses the CommonJS module system and produces JavaScript code
according to the ECMAScript2022 specification.

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

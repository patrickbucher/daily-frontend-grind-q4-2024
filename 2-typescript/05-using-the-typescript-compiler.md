# Using the TypeScript Compiler

To demonstrate the usage of the TypeScript compiler, a new project called
`tools` shall be created:

```bash
mkdir tools
cd tools
npm init --yes
```

Two dependencies—the TypeScript compiler and a tool for automatic
compilation—shall be installed:

```bash
npm install --save-dev typescript@6.2.1
npm install --save-dev tsc-watch@5.6.3
```

This will store the specified dependencies in the `devDependencies` section of
the `package.json` file—unlike dependencies installed without the `--save-dev`
option, which are listed in the `dependencies` section.

A basic compiler configuration file `tsconfig.json` shall be created:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

TypeScript files located in the `src` folder will be compiled using the
ECMAScript 2022 standard, and the resulting JavaScript code will be put into the
`dist` folder.

A file `src/index.ts` shall be created:

```typescript
function greet(whom: string): void {
  console.log(`Hello, ${whom}!`);
}

greet("TypeScript");
```

The code can be compiled and executed as follows:

```bash
tsc
node dist/index.js

Output:

    Hello, TypeScript!
```

Version numbers in `packge.json` (both in `dependencies` and `devDependencies`)
can be specified using different rules:

- `6.2.1`: the exact version
- `*`: any version
- `>6.2.1`, `>=6.2.1`, `<6.2.1`, `<=6.2.1`: versions higher/lower
  (exclusive/inclusive) than the stated version number
- `~6.2.1`: same major and minor version, but allows for other patch version
- `^6.2.1`: same major version, but allows for other minor or patch version

The most commonly used NPM commands are:

- `npm install`: install the packages specified in `package.json`
- `npm install package@version`: install a single package with a specific
  version (saved to `dependencies` in `package.json`)
- `npm install --save-dev package@version`: install a single package with a
  specific version (saved to `devDependencies` in `package.json`)
- `npm install --global package@version`: install a single package with a
  specific version globally
- `npm list`: list local packages and their dependencies
- `npm run`: execute a script defined in `package.json`
- `npx package`: runs the code of a package

The `packag.json` and `package-lock.json` files shall be _included_ in, the folder
`node_modules` shall be _excluded_ from version control

To control which files shall be compiled when running `tsc`, different options
can be specified in `tsconfig.json`:

- `files`: overrides the standard behaviour by specifying a set of files to be
  compiled
- `include`/`exclude`: define files by patterns to be included/excluded
- `compileOnSave`: hints to the text editor that `tsc` shall be run upon saving
  a file, if set to `true`

To figure out which files are considered for compilation, run:

- globally: `tsc --listFiles`
- locally: `npx tsc --listFiles`

By default, the TypeScript compiler emits JavaScript code even when it
encounters errors. This resulting code contains potential errors. To demonstrate
this problematic behaviour, extend `index.ts` with the following function call:

```typescript
function greet(whom: string): void {
  console.log(`Hello, ${whom}!`);
}

greet("TypeScript");
greet(100);
```

Compilation will fail:

    $ tsc
    src/index.ts:6:7 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'

But the following JavaScript code _was_ emitted:

```javascript
function greet(whom) {
    console.log(`Hello, ${whom}!`);
}
greet("TypeScript");
greet(100);
```

In this case, the resulting code is unproblematic, because numbers can be
printed just as strings. However, this defeats the purpose of using TypeScript.
This behaviour can be changed by setting the `noEmitOnError` setting to `true`
in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmitOnError": true
  }
}
```

For automatic recompilation, run `tsc` with the `--watch` flag:

```bash
tsc --watch
```

However, the emitted JavaScript code still needs to be executed manually. Use
the `tsc-watch` package instealled earlier for automatic execution after
compilation:

```bash
npx tsc-watch --onsuccess 'node dist/index.js'
```

To avoid typing this command again at the beginning of the next session, encode
it as a script in `package.json`:

```json
{
  "name": "tools",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "tsc-watch --onsuccess 'node dist/index.js'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "tsc-watch": "^6.2.1",
    "typescript": "^5.6.3"
  }
}
```

Which then can be run as follows:


```bash
npm start
```

To specify the targeted version of the JavaScript language being emitted by the
compiler, set the `target` option in `tsconfig.json`. By default `ES5` is used.
See the documentation of the
[`target`](https://www.typescriptlang.org/tsconfig/#target) option for all
allowed values. The other compiler options are documented on the [TSConfig
Reference](https://www.typescriptlang.org/tsconfig/) page.

If a feature is used in TypeScript code that isn't available in the targeted
JavaScript runtime, the compiler will report an error. The problem can be
resolved by either targeting a later JavaScript standard or by changing the type
definitions using the [`lib`](https://www.typescriptlang.org/tsconfig/#lib)
setting in `tsconfig.json`, which is an array of library names.

To target different type of module implementations, use the
[`module`](https://www.typescriptlang.org/tsconfig/#module) setting in
`tsconfig.json`.

See the list of [compiler options](https://www.typescriptlang.org/tsconfig/) to
further control the compilation process.


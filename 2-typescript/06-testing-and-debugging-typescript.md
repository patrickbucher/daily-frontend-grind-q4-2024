# Testing and debugging TypeScript

Because the written TypeScript code and the emitted JavaScript code do not
correlate on a line-by-line basis, _source maps_ have to be generated in order
to use a debugger on the TypeScript code. Set the `sourceMap` setting to `true`
in `tsconfig.json` in order to create `.map` files alongside the `.js` files in
the `dist` folder.

To use a debugger on TypeScript code, check your editor's documentation, or use
the `debugger` keyword together with Node.js:

```bash
node inspect dist/index.js
```

See the [Debugging
Node.js](https://nodejs.org/en/learn/getting-started/debugging) documentation
for further instructions.

A linter inspects the code for style issues and emits warnings. Install the
following packages to lint your code:

```bash
npm install --save-dev eslint@<9.0.0
npm install --save-dev @typescript-eslint/parser@8.15.0
npm install --save-dev @typescript-eslint/eslint-plugin@8.15.0
```

Create a configuration file `.eslintrc` to the project's root folder:

```json
{
  "root": true,
  "ignorePatterns": ["node_modules", "dist"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

The linter can be run using the following command:

```bash
npx eslint .
```

Change the code in `src/index.ts` to use a variable using a `let` statement:

```typescript
function greet(whom: string): void {
  let message = `Hello, ${whom}!`;
  console.log(message);
}

greet("TypeScript");
```

The linter will warn you about using `let` where `const` would be more
appropriate:

    2:7  error  'message' is never reassigned. Use 'const' instead  prefer-const

Once `let` is replaced by `const`, the message won't be shown again when linting
the code.

The rightmost information of the error message (`prefer-const`) ist the name of
the rule, which can be disabled by adding in to the `rules` section of the
`eslintrc` file:

```json
{
  …
  "rules": {
    "prefer-const": 0
  }
}
```

See the [ESLint documentation](https://eslint.org/docs/latest/use/configure/)
for further configuration options.

## Unit Testing

When writing TypeScript, both the test and the production code are compiled to
JavaScript. It's the duty of the TypeScript compiler to verify the use of
TypeScript features; the unit tests only verify JavaScript code.

Install the Jest test framework as follows:

```bash
npm install --save-dev jest@29.7.0
npm install --save-dev ts-jest@29.2.5
npm install --save-dev @types/jest@29.5.14
```

The `ts-jest` package automatically compiles TypeScript files before the tests
are executed. The `@types/jest` package contains TypeScript definitions for the
Jest API.

Create a test concifugartion file `jest.config.js` in the project's root folder
with the following content:

```javascript
module.exports = {
  roots: ["src"],
  transform: { "^.+\\.tsx?$": "ts-jest" },
};
```

The source code will be looked up in the `src` folder. Files with the `.ts` and
`.tsx` extension should be processed by `ts-jest`.

For a file called `foo.ts`, a unit test is defined in a file called
`foo.test.ts`.

Create a new file `src/rounding.ts` with the following code to be tested:

```typescript
export function roundTo(value: number, granularity: number): number {
  const factor = 1.0 / granularity;
  const scaledUp = value * factor;
  const rounded = Math.round(scaledUp);
  const scaledDown = rounded / factor;
  return scaledDown;
}
```

Create a new file `src/rounding.test.ts` with the following test code:

```typescript
import { roundTo } from "./rounding";

test("check round to cents", () => {
  expect(roundTo(10.0 / 3.0, 0.01)).toBe(3.33);
});

test("check round to nickels", () => {
  expect(roundTo(10.0 / 3.0, 0.05)).toBe(3.35);
});

test("check round to dimes", () => {
  expect(roundTo(10.0 / 3.0, 0.1)).toBe(3.3);
});
```

The `test` function provided by the Jest framework expects both a test
description as a string and a function performing the actual test. The `expect`
function expects a function result, which than can be further processed by a
_matcher function_ such as `toBe`.

The `import` statement does _not_ require a `.js` extension, because internally
`CommonJS` is used as the module system.

The tests can be run as follows:

```bash
npx jest
```

An interactive mode of test running is supported as well:

```bash
npx jest --watchAll
```

This allows the tests to be quickly executed again (e.g. by pressing `f` to run
failed tests, or by pressing `[Enter]` to run all tests again).

A complete list of Jest matcher functions can be found in the [Jest
documentation](https://jestjs.io/docs/expect).


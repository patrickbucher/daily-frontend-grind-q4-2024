# Using Decorators

Decorators are functions that transform classes, methods, fields, and accessors
by replacing without otherwise modifying them. TypeScript 5 already supports
decorators, and a future JavaScript specification will adopt them natively.

Decorators are applied using the `@` character in front of their name. The
following decorator logs the time method invocations take:

```typescript
function timed(method: any, ctx: ClassMethodDecoratorContext) {
  const name = String(ctx.name);
  return function (this: any, ...args: any[]) {
    const start = performance.now();
    const result = method.call(this, ...args);
    const finished = performance.now();
    const duration = (finished - start).toFixed(2);
    console.log(`${name}: ${duration}ms`);
    return result;
  };
}

class Factorial {
  constructor(private n: number) {}

  @timed
  calculate(): number {
    return this.doCalculate(this.n);
  }

  doCalculate(i: number): number {
    if (i == 0) {
      return 1;
    } else {
      return i * this.doCalculate(i - 1);
    }
  }
}

console.log(new Factorial(10).calculate());
```

The `ClassMethodDecoratorContext` defines various members:

- `kind`: the kind of element the decorator has been applied to (e.g. `"method"`)
- `name`: the name of the element the decorator has been applied to (string or symbol)
- `static`: whether or not the decorator has been applied to a static element
- `private`: whether or not the decorator has been applied to a private element

The `performance` API is used for timing  purposes. Notice that the method is
replaced by a function that performs the original task (i.e. calls the original
method in its context) plus some additional task (measuring its timing).

For other kinds of decorators, other context types are used:

- Class: `ClassDecoratorContext`
- Methods: `ClassMethodDecoratorContext`
- Fields: `ClassFieldDecoratorContext`
- Accessors: `ClassGetterDecoratorContext` and `ClassSetterDecoratorContext`
- Auto-accessors: `ClassAccessorDecoratorContext`

See the [documentation on
decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) for
more information.

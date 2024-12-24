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

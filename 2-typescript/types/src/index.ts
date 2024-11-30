function increment(x: number | string | null): number {
  assertIsNumeric(x);
  return x + 1;
}

function assertIsNumeric(x: any): asserts x is number {
  if (typeof x != "number") {
    throw new Error("x is not numeric");
  }
}

class MultiplicationUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  console.log(`calling primitiveMultiply(${a}, ${b})`);
  if (Date.now() % 5 == 0) {
    return a * b;
  } else {
    throw new MultiplicationUnitFailure();
  }
}

function multiply(a, b) {
  let product = undefined;
  do {
    try {
      product = primitiveMultiply(a, b);
    } catch (e) {
      if ((!e) instanceof MultiplicationUnitFailure) {
        throw e;
      }
    }
  } while (product == undefined);
  return product;
}

const a = 7;
const b = 3;
const c = multiply(a, b);
console.log(`${a} * ${b} = ${c}`);

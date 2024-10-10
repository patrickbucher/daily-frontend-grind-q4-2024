async function add(x, y) {
  return x + y;
}

async function sub(x, y) {
  return x - y;
}

async function mul(x, y) {
  return x * y;
}

async function div(x, y) {
  if (y == 0) {
    throw new Error("divide by zero");
  }
  return x / y;
}

async function compute(x) {
  let y = 2;
  let z = await add(x, y);
  z = await mul(z, y);
  z = await sub(z, y);
  z = await div(z, y);
  return z;
}

let promise = compute(3).then(console.log);

async function increment(x) {
  return x + 1;
}

async function square(x) {
  return x * x;
}

function squaredIncrement(x) {
  return increment(x).then(square);
}

squaredIncrement(3).then(console.log);

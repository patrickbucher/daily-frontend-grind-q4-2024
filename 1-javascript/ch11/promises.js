let value = Promise.resolve(42);
value.then((result) => console.log(`result: ${result}`));

let promise = new Promise((resolve) => {
  resolve(3 * 4);
});
promise = promise.then((result) => console.log(`result: ${result}`));
promise.then((foo) => console.log(foo));

let p = new Promise((resolve) => resolve(42));
p.then((value) => console.log(value));
p.then(console.log);

let x = 2;
let y = new Promise((resolve) => resolve(x))
  .then((x) => x + 2) // 4
  .then((x) => x * 2) // 8
  .then((x) => x - 2) // 6
  .then((x) => x / 2) // 3
  .then(console.log);

let input = " 13.2 ";
let result = new Promise((resolve) => resolve(input))
  .then((x) => x.trim())
  .then((x) => Number.parseFloat(x))
  .then((x) => Math.sqrt(x))
  .then(console.log);

x = 3;
result = new Promise((resolve) => resolve(x))
  .then((x) => 10 / x)
  .then((x) => 10 + x)
  .then((x) => 10 - x)
  .then((x) => 10 * x)
  .then(console.log);

function applyOpsWithTwo(x) {
  new Promise((resolve, reject) => {
    const parsed = Number.parseFloat(x);
    if (Number.isNaN(parsed)) {
      reject(new Error(`${x} cannot be parsed as float`));
    } else {
      resolve(parsed);
    }
  }).then((x) => x + 2)
    .then((x) => x * 2)
    .then((x) => x - 2)
    .then((x) => x / 2)
    .then((result) => console.log(`result: ${result}`))
    .catch((reason) => console.log(`error: ${reason}`));
}

applyOpsWithTwo(" 13.2 ");
applyOpsWithTwo("-OooO-");

function applyOps(x) {
  let plusTwo = new Promise((resolve, _) => resolve(x + 2));
  let minusTwo = new Promise((resolve, _) => resolve(x - 2));
  let timesTwo = new Promise((resolve, _) => resolve(x * 2));
  let divideByTwo = new Promise((resolve, reject) => {
    if (x != 0) {
      resolve(x / 2);
    } else {
      reject(new Error("divide by zero"));
    }
  });
  Promise.all([plusTwo, minusTwo, timesTwo, divideByTwo])
    .then((y) => console.log(`results: ${y}`))
    .catch((e) => console.log(`failed: ${e}`));
}

applyOps(3);
applyOps(0);

function promiseAll(...promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    const errors = [];
    for (const p of promises) {
      p.then((r) => results.push(r)).catch((e) => errors.push(e));
    }
    if (errors.length > 0) {
      reject(errors);
    } else {
      resolve(results);
    }
  });
}

function arithmeticPromises(x, y) {
  promiseAll(
    new Promise((resolve, _) => resolve(x + y)),
    new Promise((resolve, _) => resolve(x - y)),
    new Promise((resolve, _) => resolve(x * y)),
    new Promise((resolve, reject) => {
      if (y == 0) {
        reject(new Error("divide by zero"));
      } else {
        resolve(x / y);
      }
    }),
  ).then((x) => console.log(`promiseAll: ${x}`)).catch(console.log);
}

arithmeticPromises(3, 2);
arithmeticPromises(2, 0);

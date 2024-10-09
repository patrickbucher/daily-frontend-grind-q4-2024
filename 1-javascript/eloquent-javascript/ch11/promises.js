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

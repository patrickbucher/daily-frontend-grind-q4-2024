let value = Promise.resolve(42);
value.then(result => console.log(`result: ${result}`));

let promise = new Promise(resolve => {
  resolve(3 * 4);
});
promise = promise.then(result => console.log(`result: ${result}`));
promise.then(foo => console.log(foo));

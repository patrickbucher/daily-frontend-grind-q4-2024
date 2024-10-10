function* powers(n) {
  for (let current = n;; current *= n) {
    yield current;
  }
}

for (let power of powers(3)) {
  if (power > 50) {
    break;
  }
  console.log(power);
}

function* fibs(n) {
  let a = 1, b = 1;
  for (let i = 0; i < n; i++) {
    yield a;
    let next = a + b;
    a = b;
    b = next;
  }
}

for (let fib of fibs(10)) {
  console.log(fib);
}

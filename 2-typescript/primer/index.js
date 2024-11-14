function* createSequence(step, n) {
  let value = 0;
  for (let i = 0; i < n; i++) {
    value += step;
    yield value;
  }
}

for (let x of createSequence(6, 5)) {
  console.log(x);
}
[...createSequence(3, 4)].forEach((x) => console.log(x));

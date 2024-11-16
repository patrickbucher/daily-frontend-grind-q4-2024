let additions = [
  [3, 5],
  [1, 4],
  [4, 4],
  [2, 1],
];

let sums = new Set();

for (let [a, b] of additions) {
  sums.add(a + b);
}
sums.forEach((s) => console.log(s));

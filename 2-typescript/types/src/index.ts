let numbers: number[] = [1, 2, 3, 4, 1, 2, 3, 1, 2, 1];
let uniqueNumbers: Set<number> = new Set<number>();
let numbersCount: Map<number, number> = new Map<number, number>();

for (let n of numbers) {
  uniqueNumbers.add(n);
  if (numbersCount.has(n)) {
    let c: number = numbersCount.get(n) as number;
    numbersCount.set(n, c + 1);
  } else {
    numbersCount.set(n, 1);
  }
}

console.log(uniqueNumbers);
console.log(numbersCount);

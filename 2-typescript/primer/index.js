function mean(...numbers) {
  let actualNumbers = numbers.map((x) => (Number.isNaN(x) ? 0 : Number(x)));
  let sum = actualNumbers.reduce((acc, x) => acc + x, 0);
  return sum / actualNumbers.length;
}

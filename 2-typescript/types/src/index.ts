function discount(amount: number, percentage: number, absolute: number): number {
  const factor = (100 - percentage) / 100.0;
  return amount * factor;
}

console.log(discount(100, 5.0, 10.0));

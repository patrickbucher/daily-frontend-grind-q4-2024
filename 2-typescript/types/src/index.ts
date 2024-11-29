function discount(
  amount: number,
  percentage: number,
  absolute: number | null = 0,
): number {
  const factor = (100 - percentage) / 100.0;
  if (absolute === null) {
    absolute = 0;
  }
  return (amount - absolute | 0) * factor;
}

console.log(discount(100, 5, null));

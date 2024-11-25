function discount(
  amount: number,
  percentage: number,
  format: boolean,
): string | number {
  const factor: number = (100 - percentage) / 100.0;
  const discounted: number = amount * factor;
  if (format) {
    return `$${discounted.toFixed(2)}`;
  }
  return discounted;
}

const discounted: unknown = discount(99.9, 5.0, false);
const discountedPrice: number = discounted as number;
console.log(discountedPrice);

function discount(
  amount: number,
  percentage: number,
  format: boolean,
): string | number | null {
  if (amount == 0.0) {
    return null;
  }
  const factor: number = (100 - percentage) / 100.0;
  const discounted: number = amount * factor;
  if (format) {
    return `$${discounted.toFixed(2)}`;
  }
  return discounted;
}

let percentage!: number;
eval("percentage = 5.0;");
const discountedPrice: string | number = discount(99.9, percentage, false)!;
console.log(discountedPrice);

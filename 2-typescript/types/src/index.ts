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

const discountedPrice = discount(99.9, 5.0, false);
if (typeof discountedPrice === "string") {
  console.log(discountedPrice);
} else if (typeof discountedPrice === "number") {
  console.log(`$${discountedPrice.toFixed(2)}`);
} else {
  let impossible: never = discountedPrice;
  console.log(`unexpected type for value ${impossible}`);
}

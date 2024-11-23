function discount(amount: number, percentage: number) {
  const factor: number = (100 - percentage) / 100.0;
  const discounted: number = amount * factor;
  return discounted.toFixed(2);
}

const originalPrice = 50;
const discountRate = 1.25;
const discountedPrice = discount(originalPrice, discountRate);
console.log(discountedPrice);

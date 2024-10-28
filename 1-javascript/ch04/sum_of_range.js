function range(lower, upper, step = 1) {
  const result = [];
  if (step == 0) {
    return result;
  }
  for (
    let i = lower;
    step > 0 && i <= upper || step < 0 && i >= upper;
    i += step
  ) {
    result.push(i);
  }
  return result;
}

function sum(numbers) {
  let result = 0;
  for (let number of numbers) {
    result += number;
  }
  return result;
}

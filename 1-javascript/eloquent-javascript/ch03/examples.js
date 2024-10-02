const fib = (n) => (n < 2) ? 1 : fib(n - 2) + fib(n - 1);

const round = (number, granularity = 1.0) =>
  Math.round(number * (1 / granularity)) / (1 / granularity);

const countdown = (start = 10) => {
  return () => {
    while (start >= 0) {
      let value = start;
      start -= 1;
      return start;
    }
  };
};

const factor = (n) => {
  if (n < 0) {
    return undefined;
  } else if (n == 0) {
    return 1;
  } else {
    return n * factor(n - 1);
  }
};

export default function factorial(n) {
  if (n < 0) {
    throw new Error(`cannot compute factorial of a negative number ${n}`);
  } else if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

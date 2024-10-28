function* primes() {
  for (let candidate = 2; ; candidate += 1) {
    if (isPrime(candidate)) {
      yield candidate;
    }
  }
}

function isPrime(candidate) {
  for (let i = 2; i <= candidate / 2; i++) {
    if (candidate % i == 0) {
      return false;
    }
  }
  return true;
}

function benchmark(n) {
  const found = [];
  const started = new Date();
  let i = 0;
  for (let prime of primes()) {
    found.push(prime);
    i++;
    if (i >= n) {
      break;
    }
  }
  const finished = new Date();
  console.log(`found ${found.length} in ${finished - started}ms`);
}

benchmark(1e4);

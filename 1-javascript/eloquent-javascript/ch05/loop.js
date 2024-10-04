function loop(value, test, update, body) {
  if (test(value)) {
    body(value);
    loop(update(value), test, update, body);
  }
}

loop(1, (x) => x <= 10, (x) => x += 1, (x) => console.log(x));
loop(10, (x) => x >= 0, (x) => x -= 1, (x) => console.log(`start in: ${x}`));

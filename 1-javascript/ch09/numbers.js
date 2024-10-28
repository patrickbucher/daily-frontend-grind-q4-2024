let tests = {
  "123": 123.0,
  "12.75": 12.75,
  ".75": 0.75,
  "+123": 123.0,
  "-123": -123.0,
  "+12.75": 12.75,
  "-12.75": -12.75,
  "+0.0": 0.0,
  "-0.0": 0.0,
  ".5": 0.5,
  "5.": 5.0,
  ".": undefined,
  "5e-3": 0.005,
  "-5e-3": -0.005,
  "5e3": 5000.0,
  "-5e3": -5000.0,
};

const regexp = /^[+-]?(\d+|\d+\.?\d*|\d*\.?\d+)(e[+-]?\d+)?$/;
for (let key of Object.keys(tests)) {
  let expected = tests[key];
  let actual = Number.parseFloat(key);
  let matches = regexp.test(key);
  if (matches && actual != expected) {
    console.log(`parse ${key}: expected ${expected}, was ${actual}`);
  } else if (matches && expected == undefined) {
    console.log(`test ${key}: supposed to fail, but passed`);
  } else {
    console.log(`${key}: parses as ${actual}, expected as ${expected}`);
  }
}

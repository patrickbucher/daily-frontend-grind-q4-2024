let tests = [
  {
    inputs: { "car": true, "cat": true, "bar": false, "bat": false },
    regexp: /ca[rt]/,
  },
  {
    inputs: { "pop": true, "prop": true, "poop": false, "porp": false },
    regexp: /pr?op/,
  },
  {
    inputs: {
      "ferret": true,
      "ferry": true,
      "ferrari": true,
      "ferfried": false,
    },
    regexp: /ferr(et|y|ari)/,
  },
  {
    inputs: {
      "delicious": true,
      "pernicious": true,
      "vicious": true,
      "loose": false,
    },
    regexp: /^\w+ious$/,
  },
  {
    inputs: {
      " .": true,
      "\t,": true,
      " :": true,
      "\t;": true,
      "a;": false,
      "3:": false,
    },
    regexp: /\s[.,:;]/,
  },
  {
    inputs: { "beer": false, "computer": true, "root": false, "disease": true },
    regexp: /\w{7,}/,
  },
  {
    inputs: {
      "beer": false,
      "apple": false,
      "pear": false,
      "risk": true,
      "crack": true,
    },
    regexp: /^[^eE]+$/,
  },
];

for (const test of tests) {
  const inputs = test.inputs;
  const regexp = test.regexp;
  for (const input of Object.keys(inputs)) {
    const expected = inputs[input];
    const actual = regexp.test(input);
    const message =
      `${regexp}.test(${input}): expected ${expected}, was ${actual}`;
    if (expected && actual || !expected && !actual) {
      console.log(`OK: ${message}`);
    } else {
      console.log(`FAIL: ${message}`);
    }
  }
}

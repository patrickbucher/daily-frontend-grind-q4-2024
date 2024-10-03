function deepEqual(a, b) {
  if (a == null) {
    return b == null;
  }
  if (typeof a == "object") {
    if (typeof b != "object") {
      return false;
    }
    for (let key of Object.keys(a)) {
      let l = a[key];
      let r = b[key];
      if (!deepEqual(l, r)) {
        return false;
      }
    }
    return true;
  }
  return a === b;
}

let someObject = {
  someNumber: 3,
  someNested: {
    someString: "foo",
    someArray: [1, 2, 3],
  },
  someNothing: null,
  someUndefined: undefined,
};

let sameObject = {
  someNumber: 3,
  someNested: {
    someString: "foo",
    someArray: [1, 2, 3],
  },
  someNothing: null,
  someUndefined: undefined,
};

let slightlyDifferentObject = {
  someNumber: 3,
  someNested: {
    someString: "foo",
    someArray: [1, 2, 4], // different number
  },
  someNothing: null,
  someUndefined: undefined,
};

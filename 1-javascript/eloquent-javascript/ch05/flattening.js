function flatten(nested) {
  return nested.reduce((acc, e) => {
    if (typeof e == "object") {
      return acc.concat(flatten(e));
    } else {
      return acc.concat([e]);
    }
  }, []);
}

function arrayToList(array) {
  let head = null;
  for (let i = array.length - 1; i >= 0; i--) {
    head = prepend(array[i], head);
  }
  return head;
}

function prepend(value, list) {
  return {
    value,
    rest: list,
  };
}

function nth(n, list) {
  let element = list;
  for (let i = 0; i < n; i++) {
    element = element.rest;
  }
  return element != null ? element : undefined;
}

function nthRecursive(n, list) {
  if (n == 0) {
    return list;
  }
  if (list.rest == null) {
    return undefined;
  }
  return nthRecursive(n - 1, list.rest);
}

function listToArray(list) {
  const array = [];
  for (let node = list; node != null; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

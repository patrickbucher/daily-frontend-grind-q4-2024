function everyLoop(array, predicate) {
  for (const e of array) {
    if (!predicate(e)) {
      return false;
    }
  }
  return true;
}

function everySome(array, predicate) {
  if (array.length == 0) {
    return true;
  }
  if ([array[0]].some(predicate)) {
    return everySome(array.slice(1), predicate);
  }
  return false;
}

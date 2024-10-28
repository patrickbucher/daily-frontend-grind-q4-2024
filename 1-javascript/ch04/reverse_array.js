function reverseArray(array) {
  const result = [];
  for (let i = array.length - 1; i >= 0; i--) {
    result.push(array[i]);
  }
  return result;
}

function reverseArrayInPlace(array) {
  for (let i = 0, j = array.length - 1; i < j; i++, j--) {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
}

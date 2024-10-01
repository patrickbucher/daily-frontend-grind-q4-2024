const size = 8;
for (let row = 0; row < size; row++) {
  let line = "";
  for (let col = 0; col < size; col++) {
    line += (col % 2 == row % 2) ? " " : "#";
  }
  console.log(line);
}

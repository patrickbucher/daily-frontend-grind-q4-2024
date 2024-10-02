const countBs = (str) => countChar(str, "B");

const countChar = (str, chr) => {
  let occurrences = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == chr) {
      occurrences++;
    }
  }
  return occurrences;
};

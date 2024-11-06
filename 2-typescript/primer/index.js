let words = ["read", "write", "think", "morning"];
let [first, second] = words;
let [, , third] = words;
let [, , ...lastTwo] = words;
console.log(`first: ${first}`);
console.log(`second: ${second}`);
console.log(`third: ${third}`);
console.log(`lastTwo: ${lastTwo}`);

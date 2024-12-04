let dilbert = { name: "Dilbert", age: 42, role: "Engineer" };
let alice = { name: "Alice", age: 37, role: "Engineer" };
let wally = { name: "Wally", age: 57, lazy: true };

let engineers = [dilbert, alice, wally];

for (let engineer of engineers) {
  console.log(`${engineer.name} is ${engineer.age} years old.`); // ok
  console.log(`${engineer.name} works as a ${engineer.role}`); // error
}

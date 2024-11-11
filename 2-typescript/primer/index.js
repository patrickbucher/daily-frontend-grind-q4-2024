let Person = function (name, age) {
  this.name = name;
  this.age = age;
};

Person.prototype.toString = function () {
  return `${this.name} is ${this.age} years old`;
};

let Employee = function (name, age, percentage, salary) {
  Person.call(this, name, age);
  this.percentage = percentage;
  this.salary = salary;
};

Employee.prototype.toString = function () {
  let salary = this.percentage * 0.01 * this.salary;
  return `${Person.prototype.toString.call(this)} and earns ${salary}`;
};

Object.setPrototypeOf(Employee.prototype, Person.prototype);

let alice = new Employee("Alice", 52, 75.0, 120000);
let bob = new Person("Bob", 47);

console.log(alice.toString());
console.log(bob.toString());

console.log(`is Alice a Person? ${alice instanceof Person}`);
console.log(`is Alice an Employee? ${alice instanceof Employee}`);
console.log(`is Bob a Person? ${bob instanceof Person}`);
console.log(`is Bob an Employee? ${bob instanceof Employee}`);

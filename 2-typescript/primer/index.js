class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  toString() {
    return `${this.name} is ${this.age} years old`;
  }

  static output(...people) {
    people.forEach((p) => console.log(p.toString()));
  }
}

class Employee extends Person {
  constructor(name, age, percentage, salary) {
    super(name, age);
    this.percentage = percentage;
    this.salary = salary;
  }

  toString() {
    return `${super.toString()} and earns ${this.#salary()}`;
  }

  #salary() {
    return this.percentage * (this.salary / 100.0);
  }
}

let alice = new Person("Alice", 52);
let bob = new Employee("Bob", 47, 90, 120000);
Person.output(alice, bob);

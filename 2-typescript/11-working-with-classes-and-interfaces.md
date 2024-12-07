# Working with classes and interfaces

In JavaScript, constructor functions can be used to create objects consistently.
Unfortunately, constructor functions are treated in TypeScript like any other
function, and the compiler cannot infer a type other than `any`:

```typescript
const Employee = function (id: number, name: string) {
  this.id = id;
  this.name = name;
};

Employee.prototype.describe = function (): string {
  return `${this.id}: ${this.name}`;
};

let employees = [
  new Employee(1, "Dilbert"),
  new Employee(2, "Alice"),
  new Employee(3, "Wally"),
];
```

Output:

    'new' expression, whose target lacks a construct signature, implicitly has an 'any' type.

TypeScript neglects support for constructor functions in favor of classes, with
which the `Employee` type from above can be expressed as follows:

```typescript
class Employee {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  describe(): string {
    return `${this.id}: ${this.name}`;
  }
}

let employees: Employee[] = [
  new Employee(1, "Dilbert"),
  new Employee(2, "Alice"),
  new Employee(3, "Wally"),
];
```

The objects in the `employees` array now have a proper type, which allows them
to be tested using the `instanceof` keyword.

TODO:

- access control (public, private, protected, native JavaScript #)
- readonly properties
- simplified class constructors
- accessors (get, set, accessor)
- inheritance (extends, super)
    - with limited type inference for superclasses
- abstract classes (and methods)

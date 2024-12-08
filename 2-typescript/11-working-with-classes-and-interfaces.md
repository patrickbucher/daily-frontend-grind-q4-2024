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

## Access Control and Inheritance

In addition to JavaScripts `#` operator for private properties, TypeScript
supports the access control keywords `public` (default), `private`, and
`protected`. However, those are only enforced during compilation, but not in the
emitted JavaScript code.

Properties defined as `readonly` can only be assigned in the constructor and
only read afterwards.

Inheritance is implemented using the `extends` keyword. A subclass needs to
invoke the constructor of its superclass using the `super` keyword.

The following example shows how those concepts are being used together:

```typescript
class Person {
  private readonly id: number;
  public name: string;
  protected active: boolean;

  constructor(id: number, name: string, active: boolean) {
    this.id = id;
    this.name = name;
    this.active = active;
  }

  identify(): number {
    return this.id;
  }
}

class Employee extends Person {
  public position: string;

  constructor(id: number, name: string, active: boolean, position: string) {
    super(id, name, active);
    this.position = position;
  }
}

class Customer extends Person {
  private revenue: number;
  public segment: "b2b" | "b2c";

  constructor(
    id: number,
    name: string,
    active: boolean,
    segment: "b2b" | "b2c",
  ) {
    super(id, name, active);
    this.revenue = 0;
    this.segment = segment;
  }

  book(revenue: number) {
    if (this.active) {
      this.revenue += revenue;
    } else {
      throw new Error("Cannot book revenue on inactive customer.");
    }
  }
}

let people = [
  new Person(1, "Patrick", true),
  new Employee(2, "John", true, "Engineer"),
  new Customer(3, "Jill", true, "b2c"),
];
```

The code required for constructing an object is usually rather repetitive:

- The class defines a couple of properties.
- The constructor accepts some of those properties as parameters.
- The property values are set to the arguments being passed to the constructor.

TypeScript extends the constructor syntax by allowing visibility keywords for
constructor parameters. Those parameters are then automatically turned into
properties, and their values will be assigned to those properties.

The example from above can be simplified as follows using extended constructor
syntax:

```typescript
class Person {
  constructor(
    private readonly id: number,
    public name: string,
    protected active: boolean,
  ) {}

  identify(): number {
    return this.id;
  }
}

class Employee extends Person {
  constructor(
    id: number,
    name: string,
    active: boolean,
    public position: string,
  ) {
    super(id, name, active);
  }
}

class Customer extends Person {
  private revenue: number;

  constructor(
    id: number,
    name: string,
    active: boolean,
    public segment: "b2b" | "b2c",
  ) {
    super(id, name, active);
    this.revenue = 0;
  }

  book(revenue: number) {
    if (this.active) {
      this.revenue += revenue;
    } else {
      throw new Error("Cannot book revenue on inactive customer.");
    }
  }
}

let people = [
  new Person(1, "Patrick", true),
  new Employee(2, "John", true, "Engineer"),
  new Customer(3, "Jill", true, "b2c"),
];
```

Notice that the constructor body remains empty for the class `Person`. The class
`Employee`, however, still calls the constructor if its superclass explicitly.
Since the `revenue` property of the `Customer` class cannot be passed to the
constructor, the property remains explicitly defined and assigned.

Getter and setter methods can be defined using the `get` and `set` keyword. If
only a `get` method is defined, the property becomes a read-only property.
Usually, getter and setter methods have a _backing_ field which stores the value
being accessed. However, this is optional, and the value can be stored in a
different way for a setter, or be calculated for a getter method.

The `accessor` keyword defines a property with an optional initial value, for
which getter and setter methods are automatically generated.

The following example demonstrates the usage of those features:

```typescript
class Person {
  private jobs: string[] = new Array();

  constructor(
    private id: number,
    private firstName: string,
    private lastName: string,
  ) {}

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set job(newJob: string) {
    this.jobs.push(newJob);
  }

  get job(): string {
    if (this.jobs.length == 0) {
      throw new Error(`${this.fullName} has no job.`);
    }
    return this.jobs[this.jobs.length - 1];
  }

  accessor active: boolean = true;

  get description(): string {
    return `${this.id}: ${this.fullName} [${this.active}]`;
  }
}

const johnSmith = new Person(1, "John", "Smith");
johnSmith.job = "System Administrator";
johnSmith.active = false;
console.log(johnSmith.description);
```

### Abstract Classes

A class defined with the `abstract` keyword cannot be instantiated, but extended
by other classes. Any method declared as `abstract` needs to be implemented by
the subclass.

The concrete methods of an abstract class can call abstract methods, which need
to be implemented by the subclasses so that the method call can be resolved.

The following example defines an abstract class `Animal`, which delegates
species-specific operations to the concrete subclassess:

```typescript
abstract class Animal {
  constructor(public name: string) {}

  describe(): string {
    return `I'm ${this.name} the ${this.species()} and I make «${this.noise()}».`;
  }

  abstract species(): string;
  abstract noise(): string;
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }

  species(): string {
    return "Horse";
  }

  noise(): string {
    return "Neigh";
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }

  species(): string {
    return "Cat";
  }

  noise(): string {
    return "Meow";
  }
}

let animals = [new Horse("Betty"), new Cat("Dimka")];
animals.forEach((a) => console.log(a.describe()));
```

Output:

    I'm Betty the Horse and I make «Neigh».
    I'm Dimka the Cat and I make «Meow».

Notice that in the above example the TypeScript compiler infers the type union
`Horse | Cat` for the `animals` array. Annotating `animals` with the type
`Animal[]` makes sense here, because the compiler doesn't infer that only the
API common to those two classes is used (via its abstract superclass).

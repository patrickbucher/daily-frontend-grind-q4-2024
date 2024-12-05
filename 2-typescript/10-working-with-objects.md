# Working with objects

The object's _shape_ is the combination of its property names and types. With
the `declarations` compiler option activated, the inferred shapes of the
used objects can be seen in the declarations file.

In the following example, all three objects share the `name` and `age` property:

```typescript
let dilbert = { name: "Dilbert", age: 42, role: "Engineer" };
let alice = { name: "Alice", age: 37, role: "Engineer" };
let wally = { name: "Wally", age: 57, lazy: true };

let engineers = [dilbert, alice, wally];

for (let engineer of engineers) {
  console.log(`${engineer.name} is ${engineer.age} years old.`); // ok
  console.log(`${engineer.name} works as a ${engineer.role}`); // error
}
```

TypeScript infers that the `name` and `age` properties are available in all
three objects, and therefore the first `console.log` statement is valid.
However, the second isn't, because it tries to access the `role` property, which
is only defined on two of the three objects:

    error TS2339: Property 'role' does not exist on type …

Optional properties can be defined with the `?` suffix. In order to make use of
optional properties, additional type guards using `in` have to be used to ensure
that an optional property is actually available. For optional methods, it has to be
checked that they are not `undefined` before being called:

```typescript
type employee = {
  name: string;
  age: number;
  salary: number;
  role?: string;
  lazy?: boolean;
  calculateBonus?(salary: number): number;
};

let dilbert: employee = {
  name: "Dilbert",
  age: 42,
  salary: 100000,
  role: "Engineer",
  calculateBonus: (salary) => salary * 0.1,
};
let alice: employee = {
  name: "Alice",
  age: 37,
  salary: 90000,
  role: "Engineer",
  calculateBonus: (salary) => salary * 0.15,
};
let wally: employee = {
  name: "Wally",
  age: 57,
  salary: 80000,
  lazy: true,
  calculateBonus: (salary) => {
    if ("lazy" in this) {
      return 0;
    } else {
      return salary * 0.01;
    }
  },
};

let engineers: employee[] = [dilbert, alice, wally];

for (let e of engineers) {
  console.log(`${e.name} is ${e.age} years old.`);
  if ("role" in e) {
    console.log(`${e.name} works as a ${e.role}`);
  }
  if (e.calculateBonus) {
    console.log(`${e.name} gets a bonus of ${e.calculateBonus(e.salary)}.`);
  }
}
```

In the above example, both `role` and `lazy` are optional properties. Their
access is surrounded by `in` checks. The optional method `calculateBonus` is
checked to be defined before being invoked, otherwise the compiler would throw
an error.

When using a union of shape types, the properties common to both shape types can
be used without any further checks:

```typescript
type Employee = {
  id: number;
  name: string;
  salary: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

let dilbert: Employee = { id: 745, name: "Dilbert", salary: 100000 };
let alice: Employee = { id: 931, name: "Alice", salary: 90000 };
let stapler: Product = { id: 4529, name: "stapler", price: 8.35 };
let chair: Product = { id: 7826, name: "chair", price: 249.99 };

let assets: (Product | Employee)[] = [dilbert, stapler, alice, chair];

for (let asset of assets) {
  console.log(`${asset.id}: ${asset.name}`);
}
```

In order to make use of other properties, they can either be checked for
availability using the `in` keyword—or by applying a _type predicate_ to it,
which are functions that assert that an expression is of a certain type:

```typescript
type Employee = {
  id: number;
  name: string;
  salary: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

let dilbert: Employee = { id: 745, name: "Dilbert", salary: 100000 };
let alice: Employee = { id: 931, name: "Alice", salary: 90000 };
let stapler: Product = { id: 4529, name: "stapler", price: 8.35 };
let chair: Product = { id: 7826, name: "chair", price: 249.99 };

let assets: (Product | Employee)[] = [dilbert, stapler, alice, chair];

function isEmployee(expr: any): expr is Employee {
  return "salary" in expr;
}

function isProduct(expr: any): expr is Product {
  return "price" in expr;
}

for (let asset of assets) {
  if (isEmployee(asset)) {
    console.log(`${asset.id}: ${asset.name} earns ${asset.salary}`);
  } else if (isProduct(asset)) {
    console.log(`${asset.id}: ${asset.name} costs ${asset.price}`);
  }
}
```

By convention, type predicates follow the name `is[Type]`.

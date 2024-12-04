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

TODO:

- optional properties with `?`
- methods
- type aliases with `type`
- type guards with `in`
- type guards with a predicate function

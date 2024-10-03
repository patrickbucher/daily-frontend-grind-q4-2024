# Chapter 1

The `??` operator behaves mostly like the `||` operator, but only yields the
right-hand value if the left-hand value evaluates to `null` or `undefined`:

    > 0 || 13
    13
    > 0 ?? 13
    0

    > "" || "foo"
    "foo"
    > "" ?? "foo"
    ""

# Chapter 4

## Array Methods

| Side/Operation | Start     | End    |
|----------------|-----------|--------|
| Add            | `unshift` | `push` |
| Remove         | `shift`   | `pop`  |

## `Object`

`Object.keys` lists alls properties of an object, which can be accessed using
the index operator `[]` with the respective key:

```javascript
let person = {
  firstName: "Patrick",
  lastName: "Bucher",
  yearOfBirth: 1987,
  heightInCm: 188,
  weightInKg: 76.0,
};

for (const key of Object.keys(person)) {
  const value = person[key];
  console.log(`${key}:\t${value}`);
}
```

Output:

    firstName:	    Patrick
    lastName:	    Bucher
    yearOfBirth:	1987
    heightInCm:	    188
    weightInKg:	    76

A property can be removed from an object using the `delete` keyword:

```javascript
delete person.heightInCm;
delete person.weightInKg;
```

Properties can be copied into an object from another object using
`Object.assign`:

```javascript
Object.assign(person, { profession: "Programmer", country: "Switzerland" });
```

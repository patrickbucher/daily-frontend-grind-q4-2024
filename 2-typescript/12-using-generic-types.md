# Using generic types

Generics allow the use of type parameters in place of specific types. The
specific type is filled in upon usage, allowing existing code to work with types
that do not exist yet.

The `Item` class allows different types being used for its `id` property
(`item.ts`):

```typescript
export class Item<T> {
  constructor(
    public id: T,
    public name: string,
  ) {}

  describe(): string {
    return `${this.id}: ${this.name}`;
  }
}
```

The generic type parameter is written within angle brackets, and its naming
conventionally starts with `T`.

Unlike the `name` property, which uses the specific type `string`, the `id`
property can use any type `T`, which has to be filled in with a specific type
when the class `Item` is being used:

```typescript
import { Item } from "./item.js";

class Coordinates {
  constructor(
    public latitude: number,
    public longitude: number,
  ) {}

  toString(): string {
    return `${this.latitude};${this.longitude}`;
  }
}

const dilbert: Item<number> = new Item<number>(317, "Dilbert");
const stapler: Item<string> = new Item<string>("a3-v5-x7", "Stapler");
const chorweiler: Item<Coordinates> = new Item<Coordinates>(
  new Coordinates(51.028679, 6.89476),
  "Chorweiler",
);

console.log(dilbert.describe());
console.log(stapler.describe());
console.log(chorweiler.describe());
```

Output:

    317: Dilbert
    a3-v5-x7: Stapler
    51.028679;6.89476: Chorweiler

The `Item` class not only supports `number`, `string`, or `Coordinates` as types
for the `id` property, but any type that can be used with string interpolation,
as used in its `describe` method (e.g. by providing a `toString` method).

## Constraining generic types

The following example demonstrates the use of generics using geometry shapes
(`shapes.ts`):

```typescript
export class Rectangle {
  constructor(
    public width: number,
    public height: number,
  ) {}

  circumference(): number {
    return 2 * this.width + 2 * this.height;
  }

  area(): number {
    return this.width * this.height;
  }
}

export class Square {
  constructor(public side: number) {}

  circumference(): number {
    return 4 * this.side;
  }

  area(): number {
    return this.side * this.side;
  }
}

export class Circle {
  constructor(public radius: number) {}

  circumference(): number {
    return 2 * this.radius * Math.PI;
  }

  area(): number {
    return this.radius * this.radius * Math.PI;
  }
}

export interface Shape {
  area(): number;
}

export class Body<T extends Shape> {
  constructor(
    public base: T,
    public height: number,
  ) {}

  volume(): number {
    return this.base.area() * this.height;
  }
}
```

The `Rectangle`, `Square`, and `Circle` class are unrelated, even though they
implement the same methods (`circumference` and `area`), which could be grouped
together by an interface. The class `Body` expects a generic type parameter `T`,
which matches for any type that extends (or: implements, for that matter) the
`Shape` interface. With an additional width, a shape is turned into a body:

- A `Rectangle` or a `Square` becomes a cuboid.
- A `Circle` becomes a cylinder.

Thanks to the type restriction on `T` (it must implement `Shape`), the `area`
method can be used on the `base` object, without narrowing its type down to one
specific type.

Those geometric objects can be used as follows:

```typescript
import { Body, Circle, Rectangle, Square } from "./shapes.js";

let rectangle: Rectangle = new Rectangle(4, 3);
let square: Square = new Square(3);
let circle: Circle = new Circle(5);

console.log(
  `rectangle circumference: ${rectangle.circumference()};`,
  `rectangle area: ${rectangle.area()}`,
);
console.log(
  `square circumference: ${square.circumference()};`,
  `square area: ${square.area()}`,
);
console.log(
  `circle circumference: ${circle.circumference().toFixed(2)};`,
  `circle area: ${circle.area().toFixed(2)}`,
);

let cuboid: Body<Rectangle> = new Body(rectangle, 5);
let cube: Body<Square> = new Body(square, 4);
let cylinder: Body<Circle> = new Body(circle, 3);

console.log(`cuboid volume: ${cuboid.volume()}`);
console.log(`cube volume: ${cube.volume()}`);
console.log(`cylinder volume: ${cylinder.volume().toFixed(2)}`);
```

Output:

    rectangle circumference: 14; rectangle area: 12
    square circumference: 12; square area: 9
    circle circumference: 31.42; circle area: 78.54
    cuboid volume: 60
    cube volume: 36
    cylinder volume: 235.62

Generic types can also be restricted using a shape, so that only objects with
certain properties or methods can be used. This is more flexible than
restricting the type using a type union, which needs to be extended each time a
new (compabible) type is additionally used.

The following example restricts its type parameter `T` using a shape type:

```typescript
class NamedCollection<T extends { name: string }> {
  private items: T[];

  constructor() {
    this.items = new Array();
  }

  add(item: T) {
    this.items.push(item);
  }

  getNames(): string[] {
    return this.items.map((i) => i.name);
  }
}

type Named = { name: string };

class Dog {
  constructor(
    public name: string,
    public race: string,
  ) {}
}

class Company {
  constructor(
    public name: string,
    public revenue: number,
  ) {}
}

const myStuff: NamedCollection<Named> = new NamedCollection<Named>();
myStuff.add(new Dog("Doge", "Pitbull"));
myStuff.add(new Company("ACME Inc.", 1_359_725.39));
console.log(myStuff.getNames());
```

Output:

    [ 'Doge', 'ACME Inc.' ]

## Multiple type parameters

A class can make use of multiple type parameters, listed within angle brackets,
separated by commas, e.g. `<T, U>`. The following class computes the volume
based on an object that has an area, and on another one that has a height:

```typescript
type WithArea = { area(): number };
type WithHeight = { height: number };

class ShapeConverter<T extends WithArea, U extends WithHeight> {
  constructor(
    private withArea: T,
    private withHeight: U,
  ) {}

  volume(): number {
    return this.withArea.area() * this.withHeight.height;
  }
}

const rect = {
  a: 3,
  b: 4,
  area: function (): number {
    return this.a * this.b;
  },
};
const height = {
  height: 5,
};
const conv = new ShapeConverter(rect, height);
console.log(conv.volume());
```

Output:

    60

The second type parameter `U` could also be moved to the `volume` method, making
it generic:

```typescript
type WithArea = { area(): number };
type WithHeight = { height: number };

class ShapeConverter<T extends WithArea> {
  constructor(private withArea: T) {}

  volume<U extends WithHeight>(withHeight: U): number {
    return this.withArea.area() * withHeight.height;
  }
}

const rect = {
  a: 3,
  b: 4,
  area: function (): number {
    return this.a * this.b;
  },
};
const height = {
  height: 5,
};
const conv = new ShapeConverter(rect);
console.log(conv.volume(height));
```

Output:

    60

Notice that the type parameters haven't been stated explicitly, but have been
inferred by the compiler. Check the declarations file to find out which types
have been inferred.

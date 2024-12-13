# Using generic types

If values of different kinds of (potentially unrelated) types shall be processed
in the same function or class, generic type parameters can be used to fill in
the specific type at runtime.

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

Those geometric objects can be used as follows (`index.ts`):

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

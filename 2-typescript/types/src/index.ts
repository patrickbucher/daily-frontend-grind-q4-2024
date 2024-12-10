interface Shape {
  circumference(): number;
  area(): number;
}

interface Named {
  name: string;
}

interface Describable {
  color?: string;
  describe(): string;
}

abstract class Rectangular implements Shape, Named {
  public name: string;

  abstract circumference(): number;
  abstract area(): number;
}

class Square extends Rectangular {
  constructor(public side: number) {
    super();
  }

  circumference(): number {
    return 4 * this.side;
  }

  area(): number {
    return this.side * this.side;
  }
}

class Rectangle extends Square implements Describable {
  constructor(
    side: number,
    public otherSide: number,
    public color?: string,
  ) {
    super(side);
    this.name = "Rectangle";
  }

  circumference(): number {
    return 2 * this.side + 2 * this.otherSide;
  }

  area(): number {
    return this.side * this.otherSide;
  }

  describe(): string {
    return `${this.name} of ${this.side}x${this.otherSide}`;
  }
}

let shapes: Shape[] = [
  new Rectangle(3, 4),
  new Rectangle(2, 3, "green"),
  new Square(5),
];

shapes.forEach((s) => {
  let description: string;
  if ("describe" in s) {
    description = (s as Describable).describe();
  } else if ("name" in s && s.name) {
    description = (s as Named).name;
  } else {
    description = "Unknown shape";
  }
  console.log(
    `${description} with circumference of ${s.circumference()} and area of ${s.area()}`,
  );
});

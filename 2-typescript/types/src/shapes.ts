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
